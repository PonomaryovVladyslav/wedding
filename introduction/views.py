from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView

from introduction.models import GalleryImage


class IndexTemplateView(TemplateView):
    template_name = 'index.html'
    extra_context = {'images': GalleryImage.objects.all()}