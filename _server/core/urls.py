from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('me/', view=views.me, name="current user"),
    path('create/', view=views.create_bracket, name="create bracket"),
    path('brackets/', views.get_brackets, name="get brackets"),
    path('bracket/<int:id>/', views.fill_bracket, name='fill bracket'),
]