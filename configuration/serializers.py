from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from .models import *


class ContactUsSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model=ContactUs
        fields = '__all__'
        

class JoinUsSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model = JoinUs
        fields = '__all__'


class TermsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuration
        fields=('terms',)
