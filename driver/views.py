from rest_framework import generics, permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.serializers import *
from accounts.views import queryset_paginator
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _

from .models import *
from .serializers import *

# Seller Add driver to him
class DriverSignUp(APIView):
    def post(self, request):
        request.data.update({"user_type": "driver"})
        request.data.update({"seller_id":request.user})
        request.data.update({"status":"pending_approval"})
        serializer = DriverSerializer(data=request.data)
        if serializer.is_valid():
            driver = serializer.save()
            driver.set_password(request.data.get("password"))
            driver.save()
            return Response({"detail": _("successfully sign up"),}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors,}, status=status.HTTP_400_BAD_REQUEST)


# Driver sign up by himself
class SignUp(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        if request.data.get("terms_of_use")=="False":
            return Response({"error": _("please accept our tems of use")},
                            status=status.HTTP_400_BAD_REQUEST)
        request.data.update({"user_type": "driver"})
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            driver = serializer.save()
            driver.set_password(request.data.get("password"))
            driver.save()
            return Response({"detail": _("successfully sign up"),}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors,}, status=status.HTTP_400_BAD_REQUEST)



class Profile(APIView):
    def get(self, request, pk):
        driver=Driver.objects.get(pk=pk,seller_id=request.user)
        serializer = DriverSerializer(driver)
        return Response(serializer.data,status=status.HTTP_200_OK)
         

    def put(self, request,pk):
        driver=Driver.objects.get(pk=pk,seller_id=request.user)
        serializer=DriverSerializer(driver,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail":_("Updated Successfully")},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class SellerDrivers(APIView):
    def get(self, request):
        drivers = Seller.objects.get(pk=request.user.pk).drivers.all()
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(drivers, page)
        serializer = DriverSerializer(queryset, many=True)
        return Response({"list": serializer.data, "pages_num": number})
