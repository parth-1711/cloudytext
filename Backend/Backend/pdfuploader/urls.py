from django.urls import path
from .views import PDFUploadView,getData

urlpatterns = [
    path('',getData),
    path('upload-pdf/', PDFUploadView.as_view(), name='pdf-upload'),
]