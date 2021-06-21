from django.contrib import admin
from django.utils.html import mark_safe
# Register your models here.
from django.contrib.auth.models import User, Group

from introduction.models import GalleryImage, Quiz


class ImageAdmin(admin.ModelAdmin):
    fields = ('image', 'alt')


class QuizAdmin(admin.ModelAdmin):
    list_display = (
    'name', 'count', 'need_room_in_kh', 'need_room_in_penates', 'transfer_to', 'transfer_from_first_day',
    'transfer_from_second_day')


admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.register(GalleryImage, ImageAdmin)
admin.site.register(Quiz, QuizAdmin)
