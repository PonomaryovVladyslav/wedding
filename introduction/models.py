from django.db import models


# Create your models here.

class GalleryImage(models.Model):
    image = models.ImageField(upload_to='media/galery')
    alt = models.CharField(default="Gallery image", max_length=100)

