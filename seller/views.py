
import json
from datetime import date
from urllib.request import urlopen

from dateutil.relativedelta import relativedelta
from rest_framework import generics, permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.serializers import *
from accounts.views import queryset_paginator
from cart.models import Cart
from django.contrib.auth.hashers import make_password
from django.contrib.gis.geos import GEOSGeometry
from django.http import Http404
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _
from order.models import Order
from order.serializers import OrderSerializer
from product.models import Category, Product
from product.serializers import ProductSerializer, SellerProductsSerializer

from .serializers import *


def get_distance(lat1, lon1, lat2, lon2):

    pnt = GEOSGeometry(f'SRID=4326;POINT({lat1} -{lon1})')
    pnt2 = GEOSGeometry(f'SRID=4326;POINT( {lat2} {lon2}  )')
    return pnt.distance(pnt2) * 100

def get_country(lat, lon):
    url = "http://maps.googleapis.com/maps/api/geocode/json?"
    url += "latlng=%s,%s&sensor=false" % (lat, lon)
    v = urlopen(url).read()
    j = json.loads(v)
    print(j)
    components = j['results'][0]['address_components']
    country = town = None
    for c in components:
        if "country" in c['types']:
            country = c['long_name']
        # if "postal_town" in c['types']:
        #     town = c['long_name']
    return country

class SellerrSignup(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        terms_of_use = request.data.get('terms_of_use')
        if terms_of_use == "False":
            return Response({"error": _("please accept our tems of use")},
                            status=status.HTTP_400_BAD_REQUEST)
        request.data.update({"user_type":"seller"})
        seller_serializer = SellerSerializer(data=request.data)
        if seller_serializer.is_valid():
            location = request.data.get('locations')
            if not location:
                return Response({"error": _("location is required")}, status=status.HTTP_400_BAD_REQUEST)
            seller = seller_serializer.save()
            seller.set_password(request.data.get("password"))
            seller.save()
            location['user'] = seller.pk
            serializer = LocationsSerializer(data=location)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({"detail":_("successfully sign up But your Location is not setted right")}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": _("successfully sign up"),}, status=status.HTTP_201_CREATED)
        return Response({"error": seller_serializer.errors,}, status=status.HTTP_400_BAD_REQUEST)

class SellerList(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        qs = (request.GET).dict()
        location = None
        if "location" in qs:
            location = qs["location"]
            del qs["location"]
        if "page" in qs:
            del qs["page"]
        filter_list = ['first_name__startswith', 'products__sub_category__name']
        for key in qs:
            if not (key in filter_list):
                del key
        sellers = Seller.objects.filter(**qs).distinct()
        lat1 = None
        if location:
            try:
                lat1, lon1 = location.split(',')
            except:
                return Response({"error": "please enter a valid location format"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if request.user.pk:
                try:
                    user_location = UserLocation.objects.get(
                        user=request.user, is_default=True)
                except:
                    return Response({"error": _("You don't have any locations yet")},
                                    status=status.HTTP_400_BAD_REQUEST)
                lat1, lon1 = user_location.lat, user_location.lon
        seller_list = []
        if lat1:
            try:
                configuration = Configuration.get_solo()
                radius = configuration.radius
            except:
                radius = 2000000
            for seller in sellers:
                try:
                   seller_location = seller.locations.get(is_default=True)
                   lat, lon = (seller_location.lat, seller_location.lon)
                   distance = get_distance(lat1, lon1, lat, lon)
                   if distance == -1 or ((distance is not None) and (distance <= radius)):
                        seller.calculated_distance = distance
                        seller_list.append(seller)
                except:
                    pass    
        else:
            seller_list = sellers
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(seller_list, page)

        serializer = SellerSerializer(
            queryset, many=True, context={"user": request.user})
        return Response({"list": serializer.data, "pages_num": number})

class UpdateSellerPofile(generics.RetrieveUpdateAPIView):
    def update(self, request):
        try:
            seller=Seller.objects.get(pk=request.user.id)
        except Seller.DoesNotExist:
            return Response({"error": _("NO Seller to update")}, status=status.HTTP_400_BAD_REQUEST)
        update_serializer = UpdateSellerProfileSerializer(
            seller, data=request.data, partial=True)
        if update_serializer.is_valid():
            update_serializer.save()
            json_response = dict(update_serializer.data)
            return Response({"detail":_("Updated Successfully")}, status=status.HTTP_200_OK)
        return Response({"error": update_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SellerDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
   
    def get(self, request, pk):
        qs = (request.GET).dict()
        user = request.user
        if user.is_anonymous:
            seller =Seller.objects.get(pk=pk) 
            serializer = SellerProfileSerializer(seller)
        elif user.user_type == 'seller':
            seller =Seller.objects.get(pk=request.user.pk) 
            serializer = SellerProfileSerializer(seller)
        else:
            seller = Seller.objects.get(pk=pk)
            serializer = SellerProfileSerializer(seller,context={"user":user,"qs":qs})
        return Response(serializer.data)
        

class SellerProducts(APIView):
    def get(self, request):
        products = Product.objects.filter(seller=request.user)
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(products, page)
        serializer = SellerProductsSerializer(queryset, many=True, context={"request": request})
        return Response({"list": serializer.data, "pages_num": number})


class SellerPendingOrders(APIView):
    def get(self, request):
        pending_orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(driver__isnull=True)
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(pending_orders, page)
        serializer = SellerOrdersSerializer(queryset, many=True)
        return Response({"list": serializer.data, "pages_num": number})
        

class SellerDeliveredOrders(APIView):
    def get(self, request):
        orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_status='delivered')
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(orders, page)
        serializer = SellerOrdersSerializer(queryset, many=True)
        return Response({"list": serializer.data, "pages_num": number})

class SellerStatistics(APIView):
    def get(self, request):
        json_response = dict()
        revenue = 0.0
        monthly_revenue = 0.0
        male_percentage=0
        female_percentage = 0
        i=1
        pending_orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(driver=None, date=date.today()).count()
        delivered_orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_status='delivered', date=date.today())
        for order in delivered_orders:
            revenue = revenue +order.sub_total
        json_response['Today'] = {"pending_orders": pending_orders}
        json_response['Today'].update( {"delivered_orders": delivered_orders.count()})
        json_response['Today'].update({"revenue": revenue})
        
        # Monthly calculations
        monthly_pending_orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(driver=None, date__range=[date.today() - relativedelta(months=1), date.today()]).count()
        monthly_delivered_orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_status='delivered', date__range=[date.today() - relativedelta(months=1), date.today()])
        for order in monthly_delivered_orders:
            monthly_revenue = monthly_revenue+order.sub_total
        json_response['Month'] = {"pending_orders": monthly_pending_orders}
        json_response['Month'].update({"delivered_orders": monthly_delivered_orders.count()})        
        json_response['Month'].update({"revenue": monthly_revenue})        

        # Client Demography
        all_orders=Seller.objects.get(pk=request.user.id).seller_orders.all()
        male_orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_owner__gender='male').count()
        female_orders = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_owner__gender='female').count()
        if all_orders.count() !=0:
            male_percentage = male_orders / all_orders.count() * 100
            female_percentage = female_orders / all_orders.count() * 100
        json_response['client_demography']={'male_percentage':male_percentage}
        json_response['client_demography'].update({'female_percentage':female_percentage})
        
        # from section
        order_owner_counts=[]
        for order in all_orders:
            if order.order_owner:

                if {"order_owner": order.order_owner.id, "count": all_orders.filter(order_owner=order.order_owner).count()} not in order_owner_counts:
                    order_owner_counts.append({"order_owner": order.order_owner.id, "count": all_orders.filter(order_owner=order.order_owner).count()})


        sorted_list = sorted(order_owner_counts, key=lambda i: i['count'], reverse=True)

        for obj in sorted_list:
            if obj:
                country = User.objects.get(pk=obj['order_owner']).country.name
                country_percentage = obj['count'] / all_orders.count() * 100
                json_response['client_demography'].update({f'country_{i}': country, f'percentage_{i}': country_percentage})
                i = i + 1
            else:
                json_response['client_demography'].update({f'country_{i}': "null", f'percentage_{i}': "null"})


        # category section
        i = 1
        categories={}
        for order in all_orders:
            cart_items = Cart.objects.get(pk=order.cart_ptr_id).items.all()
            for item in cart_items:
                if item.product and item.product.category:
                    if item.product.category.name not in categories.values():
                        categories.update({f'category_{i}': item.product.category.name, f'count_{i}': 1})
                        i=i+1
                    else:
                        for k, v in categories.items():
                            if v == item.product.category.name:
                                key = 'count_' + k.split('_')[1]
                                categories.update({key: categories.get(key) + 1})
                                break

        for k, v in categories.items():
            if k.split('_')[0] == 'count':
                categories.update({k: categories.get(k) / len(all_orders) * 100})
        json_response['client_demography'].update({"categories":categories})


        
        return Response(json_response,status=status.HTTP_200_OK)


class StaffView(APIView):
    def post(self, request):
        request.data['seller']=request.user
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            staff = serializer.save()
            password= make_password(request.data.get('password'))
            staff.password = password
            staff.save()
            return Response({"detail": _("Added Successfully")})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            staff = Staff.objects.get(pk=pk)
            serializer = StaffSerializer(staff,data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"detail": _("Updated Successfully")})
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Http404
    
    def delete(self, request, pk):
        try:
            staff = Staff.objects.get(pk=pk, seller=request.user)
            staff.delete()
            return Response({"detail": _("Deleted Successfully")})
        except:
            return Http404
    
    def get(self, request):
        staffs = Staff.objects.filter(seller=request.user)
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(staffs, page)
        serializer = StaffSerializer(queryset, many=True)
        return Response({"list": serializer.data, "pages_num": number})


class RevenueDetails(APIView):
    def get(self, request):
        week1_revenue = 0.0
        week2_revenue = 0.0
        week3_revenue = 0.0
        week4_revenue = 0.0
        delivered_orders_one = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_status='delivered',date__range=[date.today() - relativedelta(weeks=1), date.today()])
        delivered_orders_two = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_status='delivered',date__range=[date.today() - relativedelta(weeks=2),date.today() - relativedelta(weeks=1)])
        delivered_orders_three = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_status='delivered',date__range=[date.today() - relativedelta(weeks=3), date.today() - relativedelta(weeks=2)])
        delivered_orders_four = Seller.objects.get(pk=request.user.id).seller_orders.filter(order_status='delivered',date__range=[date.today() - relativedelta(weeks=4), date.today() - relativedelta(weeks=3)])
        
        for order in delivered_orders_one:
            week1_revenue = week1_revenue+order.sub_total
        
        for order in delivered_orders_two:
            week2_revenue = week2_revenue+order.sub_total
        
        for order in delivered_orders_three:
            week3_revenue = week3_revenue+order.sub_total
        
        for order in delivered_orders_four:
            week4_revenue = week4_revenue + order.sub_total
        revenues = {"week1_revenue": week1_revenue}
        revenues.update({"week2_revenue": week2_revenue})
        revenues.update({"week3_revenue": week3_revenue})
        revenues.update({"week4_revenue": week4_revenue})
        revenues.update({"total_revenue": week1_revenue + week2_revenue + week3_revenue + week4_revenue})
        products = Seller.objects.get(pk=request.user.id).products.all()
        serializer=ProductSerializer(products,many=True)
        revenues['products']=serializer.data
        return Response(revenues)

class SellerImages(APIView):
    def post(self, request):
        request.data.update({"seller":request.user})
        serializer = SellerImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("Added Successfully")})
        return Response({"error": serializer.errors},status=status.HTTP_400_BAD_REQUEST)
            
    def get(self, request):
        seller = Seller.objects.get(pk=request.user.pk)
        mobile_photos = seller.images.filter(image_type='mobile')
        website_images = seller.images.filter(image_type='website')
        mobile_serializer=SellerImagesSerializer(mobile_photos,many=True)
        website_serializer=SellerImagesSerializer(website_images,many=True)

        json_response={}
        json_response = {"photo":seller.photo.url}
        json_response.update({"mobile_images":mobile_serializer.data})
        
        json_response.update({"website_images": website_serializer.data})
        json_response.update({"title":seller.store})
        json_response.update({"description":seller.describtion})
        return Response(json_response)


class DealsView(generics.RetrieveUpdateAPIView):

    def post(self, request):
        request.data.update({"seller": request.user})
        serializer = DealSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("Successfully Added")})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        deals = Seller.objects.get(pk=request.user.pk).deals
        serializer = DealSerializer(deals, many=True)
        return Response(serializer.data)
    
    def update(self, request, pk):
        deal = Deal.objects.get(pk=pk)
        serializer = DealSerializer(deal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("Updated Successfully")})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    
               

    
class DealsImagesView(APIView):
    def post(self, request):
        serializer = DealImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail":_("Added Successfully")})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class CustomizationView(APIView):
    def post(self, request):
        custoization_type = request.data.get('type')
        if not custoization_type:
            return Response({"error":_("Please Enter the Customization Type")}, status=status.HTTP_400_BAD_REQUEST)
        request.data.update({"seller": request.user})
        serializer = CustomizationSerializer(data=request.data)
        if serializer.is_valid():
            customization = serializer.save()
        else:
            return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        if custoization_type == 'category':
            for obj in request.data.get('list'):
                category = Category.objects.get(pk=obj['id'])
                customization.categories.add(category)

        if custoization_type == 'product':
            for obj in request.data.get('list'):
                product = Product.objects.get(pk=obj['id'])
                customization.products.add(product)
        
        if custoization_type == 'deal':
            for obj in request.data.get('list'):
                deal = Deal.objects.get(pk=obj['id'])
                customization.deals.add(deal)
        return Response({"detail":_("Successfully Added")})



class GetCustomizationView(APIView):
    def get(self, request):
        customizations = Seller.objects.get(pk=request.user.pk).customization.order_by('-id')
        last_customization=customizations[0]
        serializer = GetCustomizationSerializer(last_customization)
        return Response(serializer.data)

class StaffStatus(APIView):
    def put(self, request, pk):
        staff = Staff.objects.get(pk=pk)
        staff.status = 'unactive'
        staff.save()
        return Response({"detail": _("Successfully Updated")})
        
class GetStaff(APIView):
    def get(self, request, pk):
        staff = Staff.objects.get(pk=pk,seller=request.user)
        serializer = StaffSerializer(staff)
        return Response({"detail":serializer.data})
