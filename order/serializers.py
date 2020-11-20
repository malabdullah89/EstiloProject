from rest_framework import serializers

from cart.models import Cart
from cart.serializers import CartItemDetailSerializer
from seller.models import Seller

from .models import *


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_owner', 'location', 'order_status', 'payment_method', 'orderID', 'date','sub_total','total')
        
    def validate(self, data):
        context = dict()
        if not data["payment_method"]:
            context['error'] = _("You must choose your payment methods")
            raise serializers.ValidationError(context)
        return data
    
    def create(self,user,cart_id, validated_data):
        order=Order.objects.create(**validated_data,cart_ptr_id=cart_id,cart_owner=user,cart_status='checkout')
        return order
   

class CustomerOrderSerializer(serializers.ModelSerializer):
    products=serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ('order_status', 'orderID', 'date', 'products')

    def get_products(self, obj):
        cart = Cart.objects.get(pk=obj.cart_ptr_id)
        serializer = CartItemDetailSerializer(cart.items.all(),many=True)
        return serializer.data 

class SellerSerializer(serializers.ModelSerializer):
    location=serializers.SerializerMethodField()
    class Meta:
        model = Seller
        fields = ('store', 'location')
    def get_location(self, obj):
        return obj.locations.get(is_default=True).location_name
        
class OrderDetailSerializer(serializers.ModelSerializer):
    number_of_stores = serializers.SerializerMethodField()
    stores = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()
    driver_name=serializers.SerializerMethodField()
    driver_phone=serializers.SerializerMethodField()
    client_address=serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ('orderID','number_of_stores','stores','products','driver_name','driver_phone','client_address','total')
    
    def get_number_of_stores(self, obj):
        return obj.seller.all().count()

    def get_stores(self, obj):
        sellers = obj.seller.all()
        serializer = SellerSerializer(sellers, many=True)
        return serializer.data
        
    def get_products(self, obj):
        cart = Cart.objects.get(pk=obj.cart_ptr_id)
        serializer = CartItemDetailSerializer(cart.items.all(),many=True)
        return serializer.data
    
    def get_driver_name(self, obj):
        try:
            return str(obj.driver.first_name + ' ' + obj.driver.last_name)
        except:
            return "No Drivers yet"

    def get_driver_phone(self, obj):
        try:
            return obj.driver.phone
        except:
            return ""

    def get_client_address(self, obj):
        location=obj.order_owner.locations.get(is_default=True)
        return str( location.street_no +' ' + location.area+ ' '+ location.city)
