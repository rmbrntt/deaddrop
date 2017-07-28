from django.conf.urls import url
from .views import DropListCreateAPIView

urlpatterns = [
    url(r'^drops/?$', DropListCreateAPIView.as_view())
]