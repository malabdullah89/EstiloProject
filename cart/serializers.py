from rest_framework import serializers
from .models import *

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'


class CartItemDetailSerializer(CartItemSerializer):
    product_name = serializers.SerializerMethodField()
    product_describtion = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    product_size=serializers.SerializerMethodField()
    product_color=serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields=('id','product_name','product_describtion','quantity', 'price','image','product_size','product_color')
            
    def get_product_name(self, obj):
        if obj.product:
            return obj.product.name
        else:
            return "No product"

    def get_image(self, obj):
        if obj.product:
            return obj.product.image.url
        else:
            return "No product"
    
    def get_product_size(self, obj):
        if obj.product:
            return obj.product.size
        else:
            return "No product"

    def get_product_color(self, obj):
        if obj.product:
            return obj.product.color
        else:
            return "No product"
                    
    def get_product_describtion(self, obj):
        if obj.product:
            return obj.product.describtion
        else:
            return "No product"

