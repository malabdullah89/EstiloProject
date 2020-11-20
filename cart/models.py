from accounts.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
from product.models import Product

CART_STATUS = (
    ('checkout',_('checkout')),
    ('not_checkout',_('not_checkout')),
)


class Cart(models.Model):
    cart_owner = models.ForeignKey(User, related_name='carts', on_delete=models.SET_NULL, null=True)
    cart_status = models.CharField(max_length=50, choices=CART_STATUS, default='not_checkout')


class CartItem(models.Model):
    product = models.ForeignKey(Product, related_name='items', on_delete=models.SET_NULL, null=True)
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.SET_NULL, null=True)
    price = models.FloatField()
    quantity = models.IntegerField()
