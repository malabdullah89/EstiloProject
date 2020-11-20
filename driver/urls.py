from django.conf.urls import url
from .views import *

urlpatterns = [
    url('driver_signup', DriverSignUp.as_view(), name="driver_signup"),
    url('sign_up', SignUp.as_view(), name="sign_up"),
    url('seller_drivers', SellerDrivers.as_view(), name="seller_drivers"),
    url(r'^profile/(?P<pk>\d+)/$', Profile.as_view(), name="profile"),

]