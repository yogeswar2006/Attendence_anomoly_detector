from django.urls import path
from .views import upload_files,Analyze

urlpatterns=[
    path("upload/",upload_files),
    path('analyze/',Analyze),
]