from django.contrib import admin

# Register your models here.
from introduction.models import GalleryImage


class ImageAdmin(admin.ModelAdmin):
    fields = ('image', 'alt')


admin.site.register(GalleryImage, ImageAdmin)
