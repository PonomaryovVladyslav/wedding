from django.urls import path, include
from rest_framework import routers

from introduction.API.resources import QuizCreateAPIView
from introduction.views import IndexTemplateView

router = routers.DefaultRouter()
router.register(r'quiz', QuizCreateAPIView)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', IndexTemplateView.as_view(), name='index')
]
