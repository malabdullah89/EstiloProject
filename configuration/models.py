from phonenumber_field.modelfields import PhoneNumberField
from solo.models import SingletonModel

from accounts.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _

JoinUs_status = (
    ('new',_('New')),
    ('viewed',_('Viewed'))
)
class JoinUs(models.Model):
    date = models.DateTimeField(auto_now=True)
    company_name = models.CharField(max_length=100)
    email = models.EmailField(verbose_name="Email", unique=True, blank=False)
    phone = PhoneNumberField(verbose_name=_('Phone'))
    message = models.TextField()
    status = models.CharField(max_length=50, choices=JoinUs_status, default='new')


class ContactUs(models.Model):
    date = models.DateTimeField(auto_now=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(verbose_name="Email", blank=False)
    phone = PhoneNumberField(verbose_name=_('Phone'))
    message = models.TextField()
    status = models.CharField(max_length=50, choices=JoinUs_status, default='new')
    user = models.ForeignKey(User,related_name="contactus_message",on_delete=models.CASCADE,null=True)

class Configuration(SingletonModel):
    radius = models.FloatField()
    facebook_link = models.URLField()
    twitter_link = models.URLField()
    instgram_link = models.URLField()
    terms = models.TextField()
