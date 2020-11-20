from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from django.utils.translation import ugettext_lazy as _
from order.models import Order
from product.serializers import CategorySerializer,FavouriteProductListSerializer

from .models import *


class SellerSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model = Seller
        fields = ('id','email', 'store', 'describtion','phone', 'photo','password','terms_of_use','user_type','credit_card','cash','k_net','deivery_method')

        extra_kwargs = {
            'password': {'write_only': True},
            'terms_of_use': {'required': True},
            'phone': {'required': True},
        }

    def validate(self, data):
        context = dict()
        if not data["credit_card"] and not data["cash"] and not data["k_net"]:
            context['error'] = _("You must choose your payment methods")
            raise serializers.ValidationError(context)
        return data

class UpdateSellerProfileSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    
    class Meta:
        model = Seller
        fields = ('describtion', 'cash', 'credit_card', 'k_net','email','phone','photo','cover','store')

class SellerOrdersSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    customer_phone = serializers.ReadOnlyField()
    

    class Meta:
        model = Order
        fields = ('id','orderID', 'customer_name','customer_phone')
        
    def get_customer_name(self, obj):
        return str(obj.order_owner.first_name + ' ' + obj.order_owner.first_name)
        
        
class StaffSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model = Staff
        fields='__all__'


class SellerImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerImages
        fields = '__all__'
        
class DealSerializer(serializers.ModelSerializer):
    images=serializers.SerializerMethodField()
    class Meta:
        model = Deal
        fields = '__all__'
    def get_images(self, obj):
        res=[]
        images = obj.images.all()
        for image_obj in images:
            res.append(image_obj.image.url)
        return res
        
class DealImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DealImages
        fields = '__all__'
        
class CustomizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customization
        fields = ('seller', 'style')
        
class GetCustomizationSerializer(serializers.ModelSerializer):
    deals = serializers.SerializerMethodField()
    products=serializers.SerializerMethodField()
    categories=serializers.SerializerMethodField()
    class Meta:
        model = Customization
        fields = '__all__'
    def get_deals(self, obj):
        return DealSerializer(obj.deals.all(), many=True).data
        
    def get_categories(self, obj):
        return  CategorySerializer(obj.categories.all(),many=True).data
    def get_products(self, obj):
        return FavouriteProductListSerializer(obj.products.all(),many=True).data