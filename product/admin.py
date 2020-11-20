from django.contrib import admin

from .models import *

class ImagesInline(admin.StackedInline):
    model = ProductImages
    extra = 1
    can_delete = True
    readonly_fields = ('product',)
    

class ProductAdmin(admin.ModelAdmin):
    inlines = [ImagesInline]

    def has_add_permission(self, request):
        return True

admin.site.register(Product,ProductAdmin)
admin.site.register(Category)
admin.site.register(SubCategory)
