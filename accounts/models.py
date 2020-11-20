from django_countries.fields import CountryField

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager

USER_TYPE = (
        ('driver', _("Driver")),
        ('seller', _("Seller")),
        ('customer', _("Customer")),
    )
GENDER = (
    ('male',_('Male')),
    ('female',_('Female')),
)

class User(AbstractBaseUser, PermissionsMixin):
    photo = models.ImageField(upload_to='images/users', null=True, blank=True)
    phone = PhoneNumberField(verbose_name=_('Phone'),unique=True,null=True)
    points = models.IntegerField(default=0)
    email = models.EmailField(verbose_name="Email", unique=True, blank=False)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    reset_password_code = models.CharField(max_length=100, null=True, blank=True)
    favourite_products=models.ManyToManyField('product.Product',related_name="users")
    user_type = models.CharField(choices=USER_TYPE, max_length=100, verbose_name=('User Type'), default='customer')
    terms_of_use = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=0)
    country = CountryField(null=True, blank=True)
    gender = models.CharField(choices=GENDER, max_length=100, null=True, blank=True)
    
    USERNAME_FIELD = 'email'

    
    objects = CustomUserManager()
   
    def __str__(self):
        return str(self.first_name + ' ' + self.last_name)



class UserLocation(models.Model):
    city = models.CharField(max_length=50)
    lat = models.FloatField()
    lon = models.FloatField()
    user = models.ForeignKey(User, related_name='locations', on_delete=models.CASCADE, null=True)
    location_name = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    block_no = models.CharField(max_length=100)
    street_no = models.CharField(max_length=100)
    building = models.CharField(max_length=100)
    floor = models.CharField(max_length=100,null=True, blank=True)
    appartment_no=models.CharField(max_length=100,null=True, blank=True)
    is_default = models.BooleanField(default=False)

    class Meta:
        unique_together = ('lat', 'user', 'lon',)

    def save(self, *args, **kwargs):
        if (self.is_default and self.pk) or (not self.pk):
            self.is_default = True

            prev_location = UserLocation.objects.filter(
                user=self.user, is_default=True)
            for location in prev_location:
                location.is_default = False
                location.save()

        super(UserLocation, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.user.first_name + ' ' + self.user.last_name)



class FBToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="fb_tokens")
    token = models.TextField(unique=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.user)
