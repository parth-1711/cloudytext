from django.db import models

class UploadedPDF(models.Model):
    pdf_file = models.FileField(upload_to='pdfs/')

class WordCloud(models.Model):
    word_cloud=models.ImageField( upload_to='images/')