from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from backend import settings
from django.conf.urls.static import static

urlpatterns = [
	path('register/', views.CreateUser.as_view()),
	path('login/', obtain_auth_token),
	path('logout/', views.LogoutUser.as_view()),
	path('my_animal/', views.get_my_animal),
	path('my_info/', views.my_info),
	path('last_updated_date/', views.get_last_updated_date),
	path('animal_list/', views.get_animal_list),
	path('adopt_animal/', views.adopt_animal),
	path('animal_movement/', views.get_animal_movement),
	path('user_movement/', views.update_user_movement),
	path('user_movement_history/', views.get_user_movement),
	path('user_movement_list/', views.get_user_movement_list),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
