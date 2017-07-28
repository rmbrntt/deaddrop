from rest_framework import serializers
from .models import Drop
from deaddrop.apps.profiles.serializers import ProfileSerializer

class DropSerializer(serializers.ModelSerializer):

    agent = ProfileSerializer(read_only=True)
    id = serializers.UUIDField(required=False)
    lat = serializers.DecimalField(max_digits=9, decimal_places=7)
    lng = serializers.DecimalField(max_digits=10, decimal_places=7)
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    updatedAt = serializers.SerializerMethodField(method_name='get_updated_at')

    class Meta:
        model = Drop
        fields = (
            'lng',
            'lat',
            'agent',
            'title',
            'description',
            'createdAt',
            'updatedAt',
            'id',
            'signal',
            'covert_message'
        )

    def create(self, validated_data):
        agent = self.context.get('agent', None)
        return Drop.objects.create(agent=agent, **validated_data)

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()



