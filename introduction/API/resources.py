from rest_framework.authentication import BasicAuthentication
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from introduction.API.serializers import QuizSerializer
from introduction.models import Quiz


class QuizCreateAPIView(CreateModelMixin, GenericViewSet):
    permission_classes = [AllowAny, ]
    authentication_classes = [BasicAuthentication, ]
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
