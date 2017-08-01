from django.db import models
from deaddrop.apps.core.models import TimestampedModel
import uuid

class Drop(TimestampedModel):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=35)
    message = models.TextField()
    lat = models.DecimalField(max_digits=100, decimal_places=50)
    lng = models.DecimalField(max_digits=100, decimal_places=50)
    agent = models.ForeignKey('profiles.Profile', on_delete=models.CASCADE, related_name='drops')

    def __str__(self):
        return self.title


