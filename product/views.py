from rest_framework import generics, permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.views import queryset_paginator
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _

from .models import *
from .serializers import *


class CategoryView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("Category added Successfully")})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class SubCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = SubCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("SubCategory added Successfully")})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, pk):
        subcategories = Category.objects.get(pk=pk).childerns.all()
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response({"detail":serializer.data})

class AddProduct(APIView):

    def post(self, request):
        if not request.user.user_type == "seller":
            return Response({"error": _("Sorry You haven't the access to add product")},
                            status=status.HTTP_401_UNAUTHORIZED)
        request.data.update({"seller": request.user.id})
        images = request.data.get("image_list", "")
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            for obj in images:
                obj['product'] = product.id
                images_seializer = ProductImageSerializer(data=obj)
                if images_seializer.is_valid():
                    images_seializer.save()
                    json_response = dict(serializer.data)
                    json_response['image_list']=[]
                    for image in obj:
                        json_response['image_list'].append({"image":obj['image']})
                    return Response(json_response, status=status.HTTP_201_CREATED)
                return Response({"error":images_seializer.errors},status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UpdateDeleteProduct(generics.RetrieveUpdateAPIView):

    def update(self, request):
        product = Product.objects.get(id=request.path.split('/')[3])
        if not product.seller.id == request.user.id:
            return Response("error",status=status.HTTP_401_UNAUTHORIZED)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail":_("Updated Successfully")}, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request):
        if request.user.user_type == "seller":
            try:
                product = Product.objects.get(pk=request.path.split('/')[3])
            except:
                return Response({"error": _("No products")}, status=status.HTTP_400_BAD_REQUEST)
            # we need to check here if this product has orders on it or not if yes we must tell  the seller that this product have already orders 
            product.delete()
            return Response({"detail": _("your product has been deleted successfully")}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class AddProductFavourite(APIView):
    def post(self, request):
        if not request.user.user_type == "customer":
            return Response({"error": _("Sorry You cannot add product to favourite")},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            product = Product.objects.get(pk=request.data.get("product"))
            request.user.favourite_products.add(product)
            request.user.save()
            return Response({"detail": _("Added to favourite list successfully.")})
        except Product.DoesNotExist:
            return Response({"error": _("No products.")}, status=status.HTTP_400_BAD_REQUEST)



class RemoveProductFavourite(APIView):
    def post(self, request):
        if not request.user.user_type == "customer":
            return Response({"error": _("Sorry You cannot remove product from favourite")},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            product = Product.objects.get(pk=request.data.get("product"))
            request.user.favourite_products.remove(product)
            request.user.save()
            return Response({"detail": _("Removed from favourite successfully.")})
        except Product.DoesNotExist:
            return Response({"error": _("No products.")}, status=status.HTTP_400_BAD_REQUEST)


class FavouriteList(APIView):
    def get(self, request):

        if not request.user.user_type == "customer":
            return Response({"error": _("Sorry You haven't favourite product list")},
                            status=status.HTTP_401_UNAUTHORIZED)
        products = request.user.favourite_products.all()
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(products, page)
        serializer = FavouriteProductListSerializer(
            queryset, many=True, context={"user": request.user})
        return Response({"list": serializer.data, "pages_num": number})


class ProductDetail(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, pk):
        product = Product.objects.get(pk=pk)
        if request.user.user_type == 'seller':
            product.viewed = True
            product.save()
        serializer = ProductDetailSerializer(product,context={"user": request.user})
        return Response(serializer.data,status=status.HTTP_200_OK)
