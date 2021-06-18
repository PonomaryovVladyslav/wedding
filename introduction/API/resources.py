from rest_framework.generics import CreateAPIView

from introduction.API.serializers import QuizSerializer
from introduction.models import Quiz


class QuizCreateAPIView(CreateAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
