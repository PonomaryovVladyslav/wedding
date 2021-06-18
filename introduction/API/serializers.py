from rest_framework.serializers import ModelSerializer

from introduction.models import Quiz


class QuizSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'
