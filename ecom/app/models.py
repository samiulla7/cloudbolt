from django.db import models
from django.contrib.auth.models import User
import uuid


# Create your models here.

def content_file_name(instance, filename):
    return '/'.join([str(uuid.uuid4()), filename])

class UserProfile(models.Model):
    # User Table Data
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    registration_id = models.CharField(max_length = 25, blank=True)
    # User Identidy Details
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.CharField(db_index=True, max_length=250)
    is_admin = models.BooleanField(default=0)
    # System Info
    created_date = models.DateTimeField(auto_now_add = True,blank=True, null=True)
    modified_date = models.DateTimeField(auto_now = True, blank=True, null=True)

    def __unicode__(self):
        return self.user.username

class Products(models.Model):
    created_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=250)
    product_description = models.TextField()
    category = models.CharField(max_length=250)
    quantity_per_unit = models.CharField(max_length=250)
    unit_price = models.FloatField(default=0.0)
    picture = models.FileField(upload_to=content_file_name, null=True, blank=True)
    color = models.CharField(max_length=250, null=True, blank=True)
    size = models.CharField(max_length=250, null=True, blank=True)
    # System Info
    created_date = models.DateTimeField(auto_now_add = True,blank=True, null=True)
    modified_date = models.DateTimeField(auto_now = True, blank=True, null=True)

    def __unicode__(self):
        return self.product_name
