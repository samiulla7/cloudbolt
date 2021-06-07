from django.urls import path, re_path
from django.conf.urls import  include
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework_jwt import views as rfj
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from app.views import *

urlpatterns = [
    re_path(r'^$', index, name='index'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get_user_profile_list/', get_user_profile_list, name='get_user_profile_list'),
    re_path(r'^login/', user_login, name='user_login'),
    re_path(r'^register/', user_register, name="user_register"),
    path(
		'get_product_list/',
	    ProductsViewset.as_view({'get': 'get_product_list'}),
		name='get_product_list'),
    path(
		'retrieve_product/',
	    ProductsViewset.as_view({'post': 'retrieve_product'}),
		name='retrieve_product'),
    path(
		'create_product/',
	    ProductsViewset.as_view({'post': 'create_product'}),
		name='create_product'),
    path(
		'update_product/',
	    ProductsViewset.as_view({'post': 'update_product'}),
		name='update_product'),
    path(
		'delete_product/',
	    ProductsViewset.as_view({'post': 'delete_product'}),
		name='delete_product'),
    
    path(
		'upload_product_image/',
	    ProductsViewset.as_view({'post': 'upload_product_image'}),
		name='upload_product_image'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)