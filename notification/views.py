from rest_framework import generics, permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.views import queryset_paginator
from django.shortcuts import render

from .models import *
from .serializers import *


class UserNotifications(APIView):
    def get(self, request):
        notifiations = Notification.objects.filter(user=request.user)
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(notifiations, page)
        serializer = NotificationSerializer(
            queryset, many=True, context={"request": request})
        return Response({"list": serializer.data, "pages_num": number})

class NotificationDetail(APIView):
    def get(self, request, pk):
        notification = Notification.objects.get(pk=pk)
        serializer = NotificationSerializer(notification)
        return Response({"detail": serializer.data},status=status.HTTP_200_OK)
