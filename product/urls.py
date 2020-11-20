from django.conf.urls import url

from .views import *

urlpatterns = [
    url('categories', CategoryView.as_view(), name="categories"),
    url('subcategory', SubCategoryView.as_view(), name="subcategory"),
    url(r'^category_subs/(?P<pk>\d+)/$', SubCategoryView.as_view(), name="category_subs"),
    url('update_delete_product', UpdateDeleteProduct.as_view(), name="update_delete_product"),
    url('product', AddProduct.as_view(), name="product"),
    url('add_to_favourite', AddProductFavourite.as_view(), name="add_to_favourite"),
    url('remove_favourite', RemoveProductFavourite.as_view(), name="remove_favourite"),
    url('favourite_list', FavouriteList.as_view(), name="favourite_list"),
    url(r'^detail/(?P<pk>\d+)/$', ProductDetail.as_view(), name="detail"),
]