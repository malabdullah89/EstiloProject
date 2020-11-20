from django.conf.urls import url
from .views import *

urlpatterns = [
    url('user_notifications', UserNotifications.as_view(), name="user_notifications"),
    url(r'^notification_detail/(?P<pk>\d+)/$', NotificationDetail.as_view(), name="notification_detail"),

    ]

