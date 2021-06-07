from django.contrib.auth.models import User
from .app.models import UserProfile
# Creating Django Admin ------------------------------------------------
user,status = User.objects.get_or_create(username='admin@ecom.com')
user.email = 'admin@ecom.com'
user.first_name = 'Admin'
user.last_name = 'Ecom'
user.is_active = True
user.is_superuser = True
user.is_staff = True
user.set_password('1234')
user.save()
user_profile, s = UserProfile.objects.get_or_create(user=user)
user_profile.is_admin = True
user_profile.first_name = user.first_name
user_profile.last_name = user.last_name
user_profile.email = user.email
user_profile.save()
exit()