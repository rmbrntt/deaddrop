from django.db import models
from deaddrop.apps.core.models import TimestampedModel
# Create your models here.

class Profile(TimestampedModel):

    user = models.OneToOneField('authentication.User', on_delete=models.CASCADE)
    headline = models.TextField(blank=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.user.username