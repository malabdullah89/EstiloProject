from rest_framework import generics, permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import render
from .serializers import *
from django.utils.translation import ugettext_lazy as _



class ContactUsView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        if request.user:
            request.data["user"] = request.user.id
        serializer = ContactUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail":_("Thank you for contacting us.")},status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors},status=status.HTTP_400_BAD_REQUEST)


class JoinUsView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = JoinUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail":_("We will reply you as soon as possible.")},status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        
        

class TermsView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        try:
            terms = Configuration.get_solo()
            serializer = TermsSerializer(terms)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            terms = None
        return Response({"terms": terms},status=status.HTTP_200_OK)