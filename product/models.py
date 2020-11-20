from accounts.models import UserLocation
from django.db import models
from django.utils.translation import ugettext_lazy as _
from seller.models import Seller

PRODUCT_SEX = (
    ('men',_("Men")),
    ('women',_("Women")),
    ('kid', _("Kids")),
    ('unisex',_("unisex")),
)

PRODUCT_STATUS = (
    ('ready',_('ready')),
    ('not_ready',_('not_ready'))
)

PRODUCT_SIZE = (
    ('XL', 'XL'),
    ('L', 'L'),
    ('S', 'S'),
    ('M','M')
)

PRODUCT_COLOR = (
    ('White', _("White")),
    ('Red', _("Red")),
    ('Green', _("Green")),
    ('Black', _("Black")),
    ('Purble', _("Purble")),
    ('Blue', _("Blue")),
    ('Yellow', _("Yellow")),
    ('Pink', _("Pink")),
    ('Grey', _("Grey")),
    ('Gold', _("Gold")),
    
)

class Category(models.Model):
    name = models.CharField(max_length=200,unique=True)
    describtion = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="images/category")
    scrol_order_no=models.IntegerField()

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=200)
    describtion = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="images/category")
    category = models.ForeignKey(Category, related_name="childerns", on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = "Sub Categories"

    def __str__(self):
        return self.name



class Product(models.Model):
    name = models.CharField(max_length=50)
    describtion = models.TextField()
    image=models.ImageField(upload_to='images/products', null=True, blank=True)
    seller = models.ForeignKey(Seller, related_name="products", on_delete=models.SET_NULL, null=True)
    available=models.BooleanField(default=True)
    prepared_time = models.DurationField(null=True,blank=True)
    sub_category = models.ForeignKey(SubCategory, related_name="products", on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.SET_NULL, null=True)
    sex = models.CharField(max_length=50, choices=PRODUCT_SEX, default='unisex')
    size = models.CharField(max_length=50, choices=PRODUCT_SIZE, default='L')
    color = models.CharField(max_length=50, choices=PRODUCT_COLOR, default='White')
    date = models.DateField(auto_now=True)
    status = models.CharField(max_length=50, choices=PRODUCT_STATUS, default='ready')
    location = models.ForeignKey(UserLocation, related_name="product", on_delete=models.DO_NOTHING, null=True)
    quantity = models.IntegerField()
    price = models.FloatField()
    discount=models.FloatField(default=0.0)
    notes =models.TextField(null=True,blank=True)
    viewed=models.BooleanField(default=False)
    class Meta:
        unique_together = ('seller', 'describtion',)

    def __str__(self):
        return self.name



class ProductImages(models.Model):
    image = models.ImageField(upload_to='images/products', null=True, blank=True)
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)

