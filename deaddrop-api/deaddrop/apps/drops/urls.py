from django.conf.urls import url, include
from .views import DropViewSet

from rest_framework.routers import DefaultRouter


router = DefaultRouter(trailing_slash=False)
router.register(r'drops', DropViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]