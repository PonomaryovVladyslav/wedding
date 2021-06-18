from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet

from introduction.API.serializers import QuizSerializer
from introduction.models import Quiz


class QuizCreateAPIView(CreateModelMixin, GenericViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
