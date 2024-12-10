from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('me/', view=views.me, name="current user"),
    # path('personal/', view=views.personal, name="personal"),
    # path('public/', view=views.public, name="public"),
    # path('brackets/', view=views.brackets, name="brackets"),
]