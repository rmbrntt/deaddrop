from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username')
    headline = serializers.CharField(allow_blank=True, required=False)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('username', 'headline', 'image')
        read_only_fields = ('username',)

    def get_image(self, obj):
        if obj.image:
            return obj.image

        #update this later
        return 'http://localhost/images/avatar.jpg'