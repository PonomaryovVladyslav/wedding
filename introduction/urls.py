from django.urls import path

from introduction.views import IndexTemplateView

urlpatterns = [
    path('', IndexTemplateView.as_view(), name='index')
]
