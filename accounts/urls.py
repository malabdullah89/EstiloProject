from django.conf.urls import url

from .views import *

urlpatterns = [
    url('signup', SignUp.as_view(), name="sign_up"),
    url('login', Login.as_view(), name="login"),
    url('profile', Profile.as_view(), name="profile"),
    url('change_password', ChangePassword.as_view(), name="change_password"),
    url('forget_password', ForgetPassword.as_view(), name="forget_password"),
    url('reset_code', LoginWithTempPassword.as_view(), name="reset_code"),
    url(r'^reset_password/(?P<pk>\d+)/$', ResetPassword.as_view(), name="reset_password"),
    url('user_points', UserPoints.as_view(), name="user_points"),
    url('location', UserLocationView.as_view(), name="location"),
    # url(r'^update_location/(?P<pk>\d+)/$', UserLocatioinView.as_view(), name="update_location"),
    url('delete_all', DeleteAllLocations.as_view(), name="delete_all"),
]