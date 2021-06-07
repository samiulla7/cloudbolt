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

# Rest Framework
from rest_framework import (viewsets, serializers)
from rest_framework import status as rest_status
from rest_framework.decorators import (
    authentication_classes, permission_classes, api_view
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

from app.serializers import *
from app.models import *

#Logger initialisation
logger = logging.getLogger(__name__)

class ProductsViewset(viewsets.ViewSet):

    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated, )
    # permission_classes = (AllowAny, )


    queryset = Products.objects.all()
    serializer_class  = ProductsSerializer

    def get_product_list(self, request):
        '''
        Purpose : To get all list of products present in database
        '''
        szr = self.serializer_class(Products.objects.all(), many=True)
        products_data = szr.data
        return Response(products_data, status=200)
    
    def retrieve_product(self, request):
        '''
        Purpose : To get a product details by using product id
        '''
        product_id = request.data.get('product_id', None)
        if product_id:
            product = self.queryset.filter(id=product_id).first()
            if product:
                szr = self.serializer_class(product)
                products_data = szr.data
                return Response({
                    'product_details': products_data,
                    'message':'success'
                }, status=200)
            else:
                return Response({
                    'message': 'Product id is invalide.'
                }, status=400)
        else:
            return Response({
                    'message': 'Product id is not found in request.'
                }, status=400)

    def create_product(self, request):
        '''
        Purpose : To create new product in database
        '''
        szr = self.serializer_class(data = request.data)
        message = ''
        if szr.is_valid():
            szr.save()
            message = 'Product successfully created.'
            return Response({
                'product_details': szr.data,
                'message' : message
            }, status=200)
        else:
            return Response(szr.errors, status=400)

    def update_product(self, request):
        '''
        Purpose : To update existing product by using product id
        '''
        product_id = request.data.get('product_id', None)
        if product_id:
            obj = self.queryset.filter(id=product_id).first()
            if obj:
                szr = self.serializer_class(obj, data = request.data)
                message = ''
                if szr.is_valid():
                    stored_data = szr.save()
                    message = 'Product successfully updated.'
                    return Response({
                        'message' : message
                    }, status=200)
                else:
                    return Response(szr.errors, status=400)
            else:
                return Response({
                    'message' : 'Product record not found.'
                }, status=400)
        else:
            return Response({'message' : 'Product Id is not passed.'}, status=400)

    def delete_product(self, request):
        '''
        Purpose : To delete a product from database by using product id
        '''
        product_id = request.data.get('product_id', None)
        if product_id:
            p = Products.objects.filter(id=product_id).first()
            if p:
                p.delete()
                return Response({
                    'message' : 'Product deleted successfully.'
                }, status=200)
            else:
                return Response({
                    'message' : 'Product record not found.'
                }, status=400)
        else:
            return Response({'message' : 'Product Id is not passed.'}, status=400)

    def upload_product_image(self, request):
        '''
        Purpose : To upload product image using product id
        '''
        print(request.data, request.FILES)
        product_id = request.data.get('product_id', None)
        picture = request.FILES['picture']
        if product_id:
            obj = self.queryset.filter(id=product_id).first()
            if obj:
                obj.picture = picture
                obj.save()
                message = 'Product image successfully updated.'
                return Response({
                    'message' : message
                }, status=200)
            else:
                return Response({
                    'message' : 'Product record not found.'
                }, status=400)
        else:
            return Response({'message' : 'Product Id is not passed.'}, status=400)

        