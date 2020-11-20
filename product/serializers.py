from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    
class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'
    
class ProductImageSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = ProductImages
        fields = ('image', 'product')

class ProductSerializer(serializers.ModelSerializer):
    favourite = serializers.SerializerMethodField()
    image = Base64ImageField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'describtion', 'image', 'seller', 'available', 'sub_category', 'category', 'date', 'sex', 'size', 'color', 'location', 'quantity', 'price', 'discount', 'notes', 'favourite')
    def get_favourite(self, obj):
        try:
            user = self.context.get("user")
            if obj in user.favourite_products.all():
                return True
        except:
            return False
        

class ProductDetailSerializer(serializers.ModelSerializer):
    favourite = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    category_name=serializers.SerializerMethodField()
    sub_category_name = serializers.SerializerMethodField()
    location_city = serializers.SerializerMethodField()
    location_area=serializers.SerializerMethodField()
    location_name=serializers.SerializerMethodField()

    class Meta:
        model = Product
        exclude=('category','sub_category','location')
        
    def get_favourite(self, obj):
        try:
            user = self.context.get("user")
            if obj in user.favourite_products.all():
                return True
        except:
            return False

    def get_images(self, obj):
        ret = [obj.image.url]
        images = ProductImages.objects.filter(product=obj)
        for image_obj in images:
            ret.append(image_obj.image.url)
        return ret
        
    def get_category_name(self, obj):
       return obj.category.name

    def get_sub_category_name(self, obj):
       return obj.sub_category.name

    def get_location_city(self, obj):
       return obj.location.city

    def get_location_area(self, obj):
       return obj.location.area
       
    def get_location_name(self, obj):
       return obj.location.location_name

class SellerProductsSerializer(serializers.ModelSerializer):
    image=serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'image', 'viewed')
    def get_image(self, obj):
        return obj.image.url
        

class FavouriteProductListSerializer(serializers.ModelSerializer):
    favourite = serializers.SerializerMethodField()
    image = Base64ImageField()
    class Meta:
        model = Product
        fields = ('id','image', 'name', 'describtion', 'favourite')
    
    def get_favourite(self, obj):
        try:
            user = self.context.get("user")
            if obj in user.favourite_products.all():
                return True
        except:
            return False