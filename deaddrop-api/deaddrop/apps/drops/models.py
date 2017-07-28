from django.db import models
from deaddrop.apps.core.models import TimestampedModel
import uuid

class Drop(TimestampedModel):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=35)
    description = models.TextField()
    signal = models.CharField(max_length=20)
    covert_message = models.TextField()
    lat = models.DecimalField(max_digits=9, decimal_places=7)
    lng = models.DecimalField(max_digits=10, decimal_places=7)
    agent = models.ForeignKey('profiles.Profile', on_delete=models.CASCADE, related_name='drops')

    def __str__(self):
        return self.title


