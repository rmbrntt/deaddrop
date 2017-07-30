from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username')
    headline = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Profile
        fields = ('username', 'headline')
        read_only_fields = ('username',)
