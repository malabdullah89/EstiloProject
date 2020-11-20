from accounts.models import *
from cart.models import Cart
from django.db import models
from django.utils.translation import ugettext_lazy as _
from seller.models import Seller


ORDER_STATUS = (
    ('added',_('Added')),
    ('accepted', _('Accepted')),
    ('processing', _('Processing')),
    ('out_for_delivery', _('OUT_FOR_DELIVERY')),
    ('delivered', _('Delivered')),
    ('cancel', _('Cancel')),
    ('unCompleted',_('UnCompleted'))
)

PAYMENT_METHOD = (
    ('k_net', _('K_NET')),
    ('credit_card', _('Credit_Card')),
    ('cash',_('Cash'))
)

PAYMENT_STATUS = (
    ('paid', _('Paid')),
    ('not_paid',_('Not_Paid'))
)



class Order(Cart):
    order_owner = models.ForeignKey(User, related_name='orders', on_delete=models.DO_NOTHING)
    driver=models.ForeignKey(User,related_name='delivery_orders',on_delete=models.SET_NULL,null=True)
    location = models.ForeignKey(UserLocation, related_name="orders", on_delete=models.DO_NOTHING)
    order_status = models.CharField(max_length=100, choices=ORDER_STATUS,default='added')
    payment_method = models.CharField(max_length=100, choices=PAYMENT_METHOD, default='cash')
    orderID = models.IntegerField()
    date = models.DateField(auto_now=True)
    sub_total = models.FloatField() # Without delivery fees
    total = models.FloatField()  # sub_total + delivery fees
    delivery_notes = models.TextField()
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS, default='not_paid')
    seller=models.ManyToManyField(Seller,related_name='seller_orders')
    # custome_service

    def __str__(self):
        return str(self.order_owner.first_name + ' ' + self.order_owner.last_name + ' ' + str(self.orderID))
        
    @property
    def customer_phone(self):
        return str(self.order_owner.phone)

