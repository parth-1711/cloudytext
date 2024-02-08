from rest_framework import serializers
from .models import UploadedPDF
from .models import WordCloud

class UploadedPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedPDF
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordCloud
        fields = '__all__'