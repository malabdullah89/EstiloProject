from phonenumber_field.modelfields import PhoneNumberField

from accounts.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _

DELIVERY_METHOD  = (
        ('has_driver', _("has_driver")),
        ('use_our_drivers', _("use_our_drivers")),
    )
STAFF_AUTHOURIZATION  = (
        ('admin', _("Admin")),
        ('accountant', _("Accountant")),
        ('seller', _("Seller")),
    )

STAFF_STATUS  = (
        ('pending_approval', _("Pending Approval")),
        ('active', _("Active")),
        ('unactive', _("Unactive")),
    )

IMAGE_TYPE = (
    ('website',_('Website')),
    ('mobile',_('Mobile')),
)

CUSTOMIZATION_STYLE = (
    ('one_view',_('One View')),
    ('list_view',_('List View')),
)

class Seller(User):
    store = models.CharField(max_length=30, blank=True)
    deivery_method=models.CharField(choices=DELIVERY_METHOD, max_length=17, verbose_name=('Delivery Method'), default='user_our_drivers')
    describtion = models.TextField()
    cash = models.BooleanField()
    credit_card = models.BooleanField()
    k_net = models.BooleanField()
    cover = models.ImageField(upload_to='images/seller', null=True, blank=True, verbose_name=_('cover'))
    commision = models.FloatField(default=0.0)
    allowed_categories = models.ManyToManyField('product.Category', related_name='sellers')


class SellerImages(models.Model):
    image = models.ImageField(upload_to='images/seller', null=True, blank=True)
    seller = models.ForeignKey(Seller, related_name='images', on_delete=models.CASCADE)
    image_type=models.CharField(choices=IMAGE_TYPE, max_length=7)

class Staff(models.Model):
    seller=models.ForeignKey(Seller,related_name='staff',on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(verbose_name=_('Phone'),unique=True)
    password = models.CharField(max_length=128)
    authorization = models.CharField(max_length=10, choices=STAFF_AUTHOURIZATION)
    status = models.CharField(max_length=16, choices=STAFF_STATUS, default='pending_approval')
    reset_password_code = models.CharField(max_length=100, null=True, blank=True)


class Deal(models.Model):
    seller=models.ForeignKey(Seller,related_name='deals',on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    describtion = models.TextField()


class DealImages(models.Model):
    deal = models.ForeignKey(Deal, related_name='images', on_delete=models.CASCADE)
    image=models.ImageField(upload_to='images/deals', null=True, blank=True)


class Customization(models.Model):
    seller = models.ForeignKey(Seller, related_name='customization', on_delete=models.CASCADE)
    products=models.ManyToManyField('product.Product',related_name='customization')
    categories = models.ManyToManyField('product.Category', related_name='customization')
    deals=models.ManyToManyField(Deal,related_name='customization')
    style = models.CharField(max_length=9, choices=CUSTOMIZATION_STYLE)