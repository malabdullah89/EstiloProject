from accounts.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _

NOTIFICATION_TYPES = (
    ('welcome', _('Welcome')),
    ('forget_password', _('Forget_Password')),
    ('driver_assigned_order', _('Driver_Order')),
    ('cancel_order', _('Cancel_Order')),
    ('change_order_status',_('Change_Order_Status'))
)
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=50)
    message = models.TextField()
    date = models.DateTimeField(auto_now=True)
    # notification
    notify_type = models.CharField(max_length=100,choices=NOTIFICATION_TYPES,default='welcome')
