import random
import smtplib
import string

from rest_framework import generics, permissions, request, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib import auth
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.core.paginator import Paginator
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _
from seller.models import Seller, Staff

from .models import User
from .serializers import *


def queryset_paginator(queryset, page, num=10):
    paginator = Paginator(queryset, num)
    number = int(paginator.num_pages)
    if int(page) > number:
        raise Http404()
    queryset = paginator.page(page)
    return queryset, number



def randomized_code(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


class SignUp(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        terms_of_use = request.data.get('terms_of_use')
        if terms_of_use == "False":
            return Response({"error": _("please accept our tems of use")},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            send_mail('Welcome mail', 'Welcome To Estilo app the Home Of Fashion',
             'dinamuhammed2017@gmail.com',
             [user.email])
            return Response({"detail": _("successfully sign up"),}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors,}, status=status.HTTP_400_BAD_REQUEST)
        
class Login(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        context = dict()
        if "phone" in request.data.keys():
            email = User.objects.get(phone=request.data.get('phone')).email
            user = auth.authenticate(email=email, password=request.data.get('password'))
        elif "email" in request.data.keys():
                user = auth.authenticate(email=request.data.get('email'), password=request.data.get('password'))
        if user is None:
            context['error'] = _(
                "Please enter the correct email/phone number and a correct password")
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        token, created = Token.objects.get_or_create(user=user)
        context['token'] = token.key
        context['user_type'] = user.user_type
        return Response(context, status=status.HTTP_200_OK)


class Profile(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()

    def retrieve(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    
    def update(self, request):
        serializer = UpdateProfileSerializer(
            request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            json_response = dict(serializer.data)
            return Response(json_response, status=status.HTTP_200_OK)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        return super(Profile, self).retrieve(request, pk)


class ChangePassword(APIView):
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        user = request.user
        if serializer.is_valid():
            if not user.check_password(serializer.data.get('password')):
                return Response({'password': _('Wrong password.')},
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the accounts will get
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'detail': _('Your password has been Updated Successfully.')}, status=status.HTTP_200_OK)

        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ForgetPassword(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        if email:
            try:
                # get the user from email without token
                user = User.objects.get(email=email)
                user.reset_password_code = randomized_code(4)
                user.save()
                send_mail('Forget password mail', f'your reset password code is {user.reset_password_code}',
                'dinamuhammed2017@gmail.com',
                [user.email])
            except:
                try:
                    staff = Staff.objects.get(email=email)
                    staff.reset_password_code = randomized_code(4)
                    staff.save()
                    send_mail('Forget password mail', f'your reset password code is {staff.reset_password_code}',
                    'dinamuhammed2017@gmail.com',
                    [staff.email])
                except:
                    return Response({"detail": _("No User with this Email.")},status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": _("reset code sent successfully.")}, status=status.HTTP_200_OK)
                
        return Response({"detail": _("Please Enter a valid Email.")}, status=status.HTTP_400_BAD_REQUEST)

class LoginWithTempPassword(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        if email:
            try:
                user = User.objects.get(email=email)
                if user.reset_password_code == request.data.get('code'):
                    token, created = Token.objects.get_or_create(user=user)
                else:
                    return Response({"error":_("Wrong Code")},status=status.HTTP_400_BAD_REQUEST)
            except:
                try:
                    staff = Staff.objects.get(email=email)
                    if not staff.reset_password_code == request.data.get('code'):
                        return Response({"error": _("Wrong Code")}, status=status.HTTP_400_BAD_REQUEST)
                except:
                    return Response({"detail": _("No User with this Email.")},status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": _("Your are logged in again")}, status=status.HTTP_200_OK)
                
        return Response({"detail": _("Please Enter Your Email.")}, status=status.HTTP_400_BAD_REQUEST)

class ResetPassword(APIView):

    def post(self, request,pk):
        user = request.user
        if user.user_type == 'seller':
            staff = Staff.objects.get(pk=pk)
            password = make_password(request.data.get('password'))
            staff.password = password
            staff.save()
            return Response({'detail': _("password reseted successfuly")}, status=status.HTTP_200_OK)
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.data['password'])
            user.save()
            return Response({'detail': _("password reseted successfuly")}, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UserPoints(APIView):
    def get(self, request):
        context=dict()
        user = request.user
        context['user_points']=user.points
        return Response(context, status=status.HTTP_200_OK)
        
class UserLocationView(generics.RetrieveUpdateAPIView):

    def post(self, request,pk=None):
        request.data.update({"user": request.user.pk})
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("Your Location Added Successfully")}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request):
        location = UserLocation.objects.get(id=request.path.split('/')[3])
        request.data.update({"user":request.user.pk})
        serializer = LocationSerializer(location, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("Updated Successfully")}, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        location = UserLocation.objects.get(pk=request.path.split('/')[3])
        if location.user == request.user:
            location.delete()
            return Response({"detail": _("Deleted Successfully")}, status=status.HTTP_200_OK)
        return Response({"error": _("You Are Not Able to Delete THis Location")}, status=status.HTTP_401_UNAUTHORIZED)
    
    def get(self, request):
        locations = UserLocation.objects.filter(user=request.user)
        page = request.GET.get("page", 1)
        queryset, number = queryset_paginator(locations, page)
        serializer = LocationSerializer(
            queryset, many=True, context={"request": request})
        return Response({"list": serializer.data, "pages_num": number})

class DeleteAllLocations(APIView):
    def delete(self, request):
        locations = UserLocation.objects.filter(user=request.user)
        if len(locations) > 0:
            locations.delete()
            return Response({"detail": _("Deleted Successfully")}, status=status.HTTP_200_OK)
        return Response({"error":_("Sorry, No locations to Delete.")},status=status.HTTP_200_OK)
