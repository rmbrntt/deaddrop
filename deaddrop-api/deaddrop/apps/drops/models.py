from django.db import models


class Drop(models.Model):

    lat = models.FloatField()
    lng = models.FloatField()
    username = models.ForeignKey('authentication.User', to_field='username', on_delete=models.CASCADE)


