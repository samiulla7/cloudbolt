# python imports
import datetime
import json
import hashlib
import logging
import random

# Django imports
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.conf import settings
from django.shortcuts import render, render_to_response

# Rest Framework
from rest_framework import (viewsets, serializers)
from rest_framework import status as rest_status
from rest_framework.decorators import (
    authentication_classes, permission_classes, api_view
)
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from app.serializers import *

#Logger initialisation
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------
# User Registrations: Direct Signup
# ---------------------------------------------------------------
@api_view(['POST'])
@permission_classes((AllowAny, ))
def user_register(request):
    """
    User Registration and Creating a new token manually for user while regestring
    """
    if request.data:
        user = User.objects.filter(username=request.data['username']).first()
        if user:
            return Response({
                "status":305,
                "message":"Email already exists. Try login"
            }, status=rest_status.HTTP_200_OK)
            
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = True
            user.is_staff = True
            user.set_password(request.data['password'])
            user.save()
            profile_obj = UserProfile(
                user=user
            )
            profile_obj.first_name = request.data['first_name']
            profile_obj.last_name = request.data['last_name']
            profile_obj.email = request.data['username']
            profile_obj.is_admin = False
            profile_obj.save()
            return Response({
                "status":200,
                "message":'User Registered successfully.'
            }, status=rest_status.HTTP_200_OK)
        else:
            return Response({
                "status":500,
                "message":serializer.errors
            }, status=rest_status.HTTP_200_OK)

# ---------------------------------------------------------------
# User Login: Direct Login
# ---------------------------------------------------------------
@api_view(['POST'])
@permission_classes((AllowAny, ))
def user_login(request):
    """
    User Login and Creating a new jwt token
    """
    serializer = UserLoginSerializer(data=request.data)
    user = None
    last_login = None
    if serializer.is_valid():
        user_name = serializer.data.get('username')
        user_pass = serializer.data.get('password')
        user_exists = User.objects.filter(username=user_name)
        if user_exists.exists():
            user_exists = user_exists.first()
        else:
            logger.info("user %s does not exist" %request.data.get('username',None),request)
            response_object = {
                'status': False,
                'message': 'User does not exists',
            }   
            return Response(response_object,status=rest_status.HTTP_401_UNAUTHORIZED)
        user = authenticate(
            username=user_name,
            password=user_pass
        )
        if user:
            profile_obj = UserProfile.objects.filter(user=user_exists.id).first()
            '''
            set username and token in response
            object if the user need to continue
            '''
            refresh = RefreshToken.for_user(user)
            logger.info('User Logged in')
            response_object = {
                'username': user.username,
                'first_name': user.first_name,
                'is_admin' : profile_obj.is_admin,
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'status': 'success',
                'message': 'Login Success',
                'id': profile_obj.id
            }
            # return the response object
            return Response(response_object, status=rest_status.HTTP_200_OK)
        else:
            response_object = {
                'status': False,
                'message': 'Credentials provided are wrong.',
            }   
            return Response(response_object, status=rest_status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=rest_status.HTTP_401_UNAUTHORIZED)

# ---------------------------------------------------------------
# To get all user profile data
# ---------------------------------------------------------------
@api_view(['POST'])
@authentication_classes((JWTAuthentication,))
@permission_classes((IsAuthenticated,))
def get_user_profile_list(request):
    up = UserProfile.objects.all()
    szr = UserProfileSerializer(up, many=True)
    return Response(szr.data, status=rest_status.HTTP_200_OK)


# ---------------------------------------------------------------
# To get all user profile data
# ---------------------------------------------------------------
@api_view(['GET'])
@permission_classes((AllowAny,))
def index(request):
    title="Ecom"
    return render(request, 'index.html', locals())
