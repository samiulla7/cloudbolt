from django.contrib.auth.models import User

from rest_framework import serializers

from .models import UserProfile, Products

class UserLoginSerializer(serializers.Serializer):
    '''
    User Login Serializer
    '''
    username = serializers.CharField(min_length=1, max_length=255, required=True)
    password = serializers.CharField(min_length=1, max_length=255, required=True)


class UserProfileSerializer(serializers.ModelSerializer):
    """
    UserProfile Serializer
    """
    class Meta:
        model = UserProfile
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):
    """
    Products Model Serializer
    """
    class Meta:
        model = Products
        depth = 1
        fields = '__all__'
    
    def create(self, validated_data):
        return Products.objects.create(**validated_data)
    
class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    serializers: Used Registrations Form used in Direct Signup
    """
    username = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
