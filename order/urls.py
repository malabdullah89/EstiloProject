from django.conf.urls import url
from .views import *

urlpatterns = [
    url('checkout', Checkout.as_view(), name="checkout"),
    url('user_orders', CustomerOrders.as_view(), name="user_orders"),
    url('assign_driver', AssignDriver.as_view(), name="assign_driver"),
    url(r'^seller_order/(?P<pk>\d+)/$', SellerOrder.as_view(), name="seller_order"),
    url(r'^order_detail/(?P<pk>\d+)/$', OrderDetail.as_view(), name="order_detail"),
]