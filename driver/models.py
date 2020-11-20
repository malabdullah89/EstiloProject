from accounts.models import User
from django.db import models
from seller.models import STAFF_STATUS, Seller


class Driver(User):
    name = models.CharField(max_length=30, blank=True)
    seller_id = models.ForeignKey(Seller, related_name='drivers', on_delete=models.CASCADE,null=True)
    status=models.CharField(max_length=16, choices=STAFF_STATUS,default='pending_approval')
