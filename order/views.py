from random import randint

from django.db.models import Q
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _
from rest_framework import generics, permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.views import queryset_paginator
from cart.models import Cart
from driver.models import Driver
from seller.views import get_distance

from .models import *
from .serializers import *


# return random l number
def randomized_code(l):
    range_start = 10 ** (l - 1)
    range_end = (10 ** l) - 1
    return randint(range_start, range_end)


class Checkout(APIView):
    def post(self, request):
        try:
            cart = Cart.objects.get(cart_owner=request.user, cart_status='not_checkout')
        except:
            return Response("error", status=status.HTTP_400_BAD_REQUEST)

        order_sellers=[]       
        sub_total = 0.0
        delivery_fee = 0.0
        distances = []
        prices = 0.0
        try:
            user_location = request.user.locations.get(is_default=True)
        except:
            return Response({"error":_("You must enter location to calculate delivery fee")},status=status.HTTP_400_BAD_REQUEST)
        for item in cart.items.all():
            order_sellers.append(item.product.seller)
            prices = prices + item.product.price
            quantity = item.product.quantity - item.quantity
            if quantity >= 0:
                if quantity == 0:
                    item.product.available = False
                item.product.quantity = quantity
                item.product.save()
            else:
                return Response({"error": _(f"Sorry, the available quantity in the stock is {item.product.quantity}")}, status=status.HTTP_400_BAD_REQUEST)
            try:
                distances.append(get_distance(item.product.location.lat, item.product.location.lon, user_location.lat, user_location.lon))
                distance = max(distances)
            except:
                distance = 0.0
        request.data.update({"order_owner":request.user.id})
        request.data.update({"orderID":randomized_code(6)})
        request.data.update({"location": request.user.locations.get(is_default=True).id})
        request.data.update({"sub_total":prices})
        request.data.update({"total":prices+ (distance*3)})
        json_response = dict()
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            request.data.update({"order_owner": request.user})
            request.data.update({"location": request.user.locations.get(is_default=True)})
            order = serializer.create(request.user, cart.id, validated_data=request.data)
             
            for seller in order_sellers:
                order.seller.add(seller)

            json_response['items'] = serializer.data
            json_response['delivery_fee'] = f'{distance*3} KWD'
            json_response['sub_total'] = f'{prices} KWD'
            json_response['total_amount'] = f'{prices+ (distance*3)} KWD'
            return Response(json_response)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        

class CustomerOrders(APIView):
    def get(self, request):
        orders = Order.objects.filter(order_owner=request.user)
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(orders, page)
        serializer = CustomerOrderSerializer(queryset, many=True)
        return Response({"list":serializer.data})

class SellerOrder(APIView):
    def get(self, request, pk):
        order = Order.objects.get(pk=pk, seller=request.user)
        serializer = OrderDetailSerializer(order)
        return Response({"detail": serializer.data})

class OrderDetail(APIView):
    def get(self, request, pk):
        order = Order.objects.get(pk=pk,order_owner=request.user)
        serializer = OrderDetailSerializer(order)
        return Response({"detail": serializer.data})

class AssignDriver(APIView):
    def post(self, request):
        try:
            order = Order.objects.get(cart_ptr_id=request.data.get('order_id'), seller=request.user)
            

            driver = Driver.objects.get(user_ptr_id=request.data.get('driver_id'))
            if not driver.seller_id.id == request.user.id:
                return Response({"error": "This driver is not assigned to you"}, status=status.HTTP_401_UNAUTHORIZED)
            order.driver = driver
            order.save()
            return Response({"detail":"Driver Assigned to the order successfully"})
        except:
            return Response("error",status=status.HTTP_401_UNAUTHORIZED)
