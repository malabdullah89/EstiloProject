from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from cart.models import Cart
from product.serializers import ProductSerializer
from seller.models import Seller

from .models import *


class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = ('user','lat','lon','city')

class UserLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = ('lat','lon','city',)



class UserSerializer(serializers.ModelSerializer):
    locations = UserLocationsSerializer()
    phone = PhoneNumberField()
    class Meta:
        model = User
        fields = ('email', 'first_name','last_name', 'phone', 'password', 'locations','terms_of_use','user_type','gender','country')

        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'gender': {'required': True},
            'last_name': {'required': True},
            'terms_of_use': {'required': True},
            'phone': {'required': True},
            'country': {'required': False},
        }

    def create(self, validated_data):
        location_data = validated_data.pop('locations')
        user = User.objects.create_user(**validated_data)
        location = UserLocation.objects.create(user=user, **location_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    city = serializers.SerializerMethodField()
    lat = serializers.SerializerMethodField()
    lon = serializers.SerializerMethodField()
    phone = PhoneNumberField()

    class Meta:
        model = User
        fields = ('id','first_name' ,'last_name' ,'email', 'photo', 'phone', 'points','city', 'lon', 'lat','photo','user_type')

        extra_kwargs = {
            'password': {'write_only': True},
            'phone': {'read_only': True},
            'email': {'read_only': True},
        }

    def get_city(self, obj):
        try:
            return str(obj.locations.get(is_default=True).city)
        except:
            return None

    def get_lat(self, obj):
        try:
            return str(obj.locations.get(is_default=True).lat)
        except:
            return None

    def get_lon(self, obj):
        try:
            return str(obj.locations.get(is_default=True).lon)
        except:
            return None

class SellerProfileSerializer(serializers.ModelSerializer):
    city = serializers.SerializerMethodField()
    lat = serializers.SerializerMethodField()
    lon = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()
    phone = PhoneNumberField()

    class Meta:
        model = Seller
        fields = (
            'id','store','describtion', 'photo', 'phone', 'email', 'lat', 'lon', 'city', 'products','user_type')

        extra_kwargs = {
            'password': {'write_only': True},
            'phone': {'read_only': True},
        }

    def get_city(self, obj):
        try:
            return str(obj.locations.get(is_default=True).city)
        except:
            return None

    def get_lat(self, obj):
        try:
            return str(obj.locations.get(is_default=True).lat)
        except:
            return None

    def get_lon(self, obj):
        try:
            return str(obj.locations.get(is_default=True).lon)
        except:
            return None

    def get_products(self, obj):
        qs = self.context.get("qs")
        if qs and "order_by" in qs:
            order_by = qs['order_by']
            del qs['order_by']
            if order_by == "highest_price":
                return ProductSerializer(obj.products.order_by('-price'),context={"user":self.context.get("user")}, many=True).data
            elif order_by == "lowest_price":
                return ProductSerializer(obj.products.order_by('price'),context={"user":self.context.get("user")}, many=True).data
            elif order_by == "newly_added":
                return ProductSerializer(obj.products.order_by('-date'),context={"user":self.context.get("user")}, many=True).data
            else : # order products alphapitically
                return ProductSerializer(obj.products.order_by('name'),context={"user":self.context.get("user")}, many=True).data
                
            #order by Best Seller
                
            # if order_by == 'best_seller':
            #     seller_orders = obj.seller_orders.all()
            #     for order in seller_orders:
            #         cart_items = Cart.objects.get(id=order.cart_ptr_id).items.all()
            #         best_seller_products = [{}]
            #         product_ids=[]
            #         for item in cart_items:
            #             print(item.product.id)
            #             product_ids.append(item.product.id)
            #             if item.product.id in product_ids:
            #                 for x in best_seller_products:
            #                     if x == {}:
            #                         best_seller_products.append({"product_id": item.product.id, "count": 1})
            #                     elif x['product_id'] == item.product.id:
            #                         x['count'] = x['count'] + 1
        elif qs:    
            return ProductSerializer(obj.products.filter(**self.context.get("qs")),context={"user":self.context.get("user")}, many=True).data
        return ProductSerializer(obj.products.all(),context={"user":self.context.get("user")}, many=True).data


class UpdateProfileSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model = User
        fields = ('photo', 'email', 'first_name', 'last_name', 'phone',)
        

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)


class ChangePasswordSerializer(PasswordSerializer):
    new_password = serializers.CharField(required=True)

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserLocation
        fields = '__all__'
        extra_kwargs = {
            'city': {'required': False},
            'location_name': {'required': False},
            'area': {'required': False},
            'block_no': {'required': False},
            'street_no': {'required': False},
            'building': {'required': False},
        }
        
