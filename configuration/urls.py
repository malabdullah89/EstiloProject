from django.conf.urls import url

from .views import *

urlpatterns = [
    url('contact_us', ContactUsView.as_view(), name="contact_us"),
    url('join_us', JoinUsView.as_view(), name="join_us"),
    url('get_terms', TermsView.as_view(), name="get_terms"),
]