from django.conf.urls import url

from .views import *

urlpatterns = [
    url('seller_signup', SellerrSignup.as_view(), name="seller_sign_up"),
    url('seller_list', SellerList.as_view(), name="seller_list"),
    url('update_seller_profile', UpdateSellerPofile.as_view(), name="update_seller_profile"),
    url('seller_products', SellerProducts.as_view(), name="seller_products"),
    url('pending_orders', SellerPendingOrders.as_view(), name="pending_orders"),
    url('delivered_orders', SellerDeliveredOrders.as_view(), name="delivered_orders"),
    url('seller_statistics', SellerStatistics.as_view(), name="seller_statistics"),
    url('add_staff', StaffView.as_view(), name="add_staff"),
    url('get_staffs', StaffView.as_view(), name="get_staffs"),
    url('revenue_detail', RevenueDetails.as_view(), name="revenue_detail"),
    url('seller_photos', SellerImages.as_view(), name="seller_photos"),
    url(r'^update_deal/(?P<pk>\d+)/$', DealsView.as_view(), name="update_deal"),
    url('deal', DealsView.as_view(), name="deal"),
    url('add_image', DealsImagesView.as_view(), name="add_image"),
    url('get_customization', GetCustomizationView.as_view(), name="get_customization"),
    url('customization', CustomizationView.as_view(), name="customization"),
    url(r'^staff/(?P<pk>\d+)/$', StaffView.as_view(), name="staff"),
    url(r'^update_staff_status/(?P<pk>\d+)/$', StaffStatus.as_view(), name="update_staff_status"),
    url(r'^get_staff/(?P<pk>\d+)/$', GetStaff.as_view(), name="get_staff"),
    url(r'^get_seller_profile/(?P<pk>\d+)/$', SellerDetailView.as_view(), name="get_seller_profile"),

]