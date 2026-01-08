from django.urls import path
from .views import upload_files

urlpatterns=[
    path("upload/",upload_files),
]