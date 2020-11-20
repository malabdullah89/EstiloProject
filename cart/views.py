from rest_framework import generics, permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _
from product.models import Product
from seller.models import Seller
from seller.views import get_distance

from .models import *
from .serializers import *


class AddToCart(APIView):
    """
    This Api can be accessed if the user is a Guest (not logged in) and also if the User is registered and logged in
    So we have 2 cases
    With all checks you can't add to cart from more than 3 stores
    check the product quantity
    """
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        user = request.user
        if  user.id:
            if not user.user_type == "customer":
                return Response({"error": _("Sorry You cannot add items to cart")}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            user=None
        product_id = request.data.get('product')
        quantity = request.data.get('quantity')
        try:
            product = Product.objects.get(pk=product_id)
        except:
            return Response({"error": _("Sorry, This product is out of the stock")}, status=status.HTTP_400_BAD_REQUEST)
        if quantity > product.quantity:
            return Response({"error": _(f"Sorry, the available quantity in the stock is {product.quantity}")}, status=status.HTTP_400_BAD_REQUEST)
        try:
            cart = Cart.objects.get(cart_owner=user, cart_status="not_checkout")  # check if user has only one cart uncheckout 
            sellers=[]
            cart_items = cart.items.all()
            for item in cart_items:
                if item.product.seller.id not in sellers:
                    sellers.append(item.product.seller.id)
            if len(sellers) > 3:
                return Response({"error": _("sorry you cannot add to cart from greater than 3 stores")}, status=status.HTTP_400_BAD_REQUEST)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(cart_owner=user, cart_status="not_checkout")
        request.data.update({"cart": cart.id})
        request.data.update({"cart_owner": user})
        request.data.update({"price": product.price})
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.erors,status=status.HTTP_400_BAD_REQUEST)

class CartDetails(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        try:
            sub_total = 0.0
            delivery_fee = 0.0
            distance = 0.0
            distances=[]
            try:
                if request.user:
                    cart = Cart.objects.get(cart_owner=request.user, cart_status='not_checkout')
                else:
                    cart = Cart.objects.get(id=request.path.split('/')[3] ,cart_status = 'not_checkout')
                pass
            except:
                return Response({"detail":  _("your cart is empty.")})
            cart = cart.items.all()
            try:
                user_location = request.user.locations.get(is_default=True)
            except:
                pass
            for item in cart:
                try:
                    distances.append(get_distance(item.product.location.lat, item.product.location.lon, user_location.lat, user_location.lon))
                    distance = max(distances)
                except:
                    distance = 0.0
                
            serializer = CartItemDetailSerializer(cart, many=True, context={"user": request.user})
            json_response = dict()
            json_response['items'] = serializer.data
            for price in json_response['items']:
                sub_total=sub_total+price['price']
            json_response['sub_total'] = f'{sub_total} KWD'
            json_response['delivery_fee'] = f'{distance*3} KWD' 
            json_response['total_amount'] = f'{sub_total+ (distance*3)} KWD' 
            return Response(json_response)
        except CartItem.DoesNotExist:
            return Response({"detail": _("your cart is empty.")})


class DeleteCartItem(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(self, request,pk):
        try:
            cart_item = CartItem.objects.get(id=pk).delete()
        except CartItem.DoesNotExist:
            return Response({"error":_("No item with this id")})
        return Response({"detail": _("Deleted Successfully")}, status=status.HTTP_200_OK)
        
class UpdateQuantity(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request):
        cart_item = CartItem.objects.get(pk=request.data.get('id'))
        quantity = request.data.get('quantity')
        if quantity > cart_item.product.quantity:
            return Response({"error": _(f"Sorry the only quantity in stock is {cart_item.product.quantity}")})
        cart_item.quantity = quantity
        cart_item.save()
        return Response({"detail":_("Quantity is updated Successfully")},status=status.HTTP_200_OK)


class DeleteAllItems(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(self, request, pk):
        cart_items = CartItem.objects.filter(cart__id=pk).delete()
        Cart.objects.get(id=pk).delete()
        return Response({"detail":_("Deleted Successfully")},status=status.HTTP_200_OK)
