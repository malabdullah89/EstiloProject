from django.conf.urls import url

from .views import *


urlpatterns = [
    url('add_to_cart', AddToCart.as_view(), name="add_to_cart"),
    url(r'delete_all_items/(?P<pk>\d+)/$', DeleteAllItems.as_view(), name="delete_all_items"),
    url('user_cart', CartDetails.as_view(), name="user_cart"),
    url('update_quantity', UpdateQuantity.as_view(), name="update_quantity"),
    url(r'^delete_item/(?P<pk>\d+)/$', DeleteCartItem.as_view(), name="delete_item"),
]