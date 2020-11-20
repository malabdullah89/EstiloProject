from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from .models import *


class DriverSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model = Driver
        fields = ('id','email', 'name', 'phone', 'password','user_type','photo','seller_id','status')

        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'terms_of_use': {'required': False},
            'photo': {'required': False},
        }
        
class SignUpSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model = Driver
        fields = ('email', 'name', 'phone', 'password','user_type','photo','terms_of_use')

        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'photo': {'required': False},
        }
