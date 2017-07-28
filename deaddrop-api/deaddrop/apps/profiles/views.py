from rest_framework.generics import RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import Profile
from .renderers import ProfileRenderer
from .serializers import ProfileSerializer


class ProfileRetrieveAPIView(RetrieveAPIView):

    queryset = Profile.objects.select_related('user')
    permission_classes = (AllowAny,)
    renderer_classes = (ProfileRenderer,)
    serializer_class = ProfileSerializer

    def retrieve(self, request, username, *args, **kwargs):

        try:
            profile = self.queryset.get(user__username=username)

        except Profile.DoesNotExist:
            raise NotFound('A profile with this username does not exist.')

        serializer = self.serializer_class(profile)

        return Response(data=serializer.data, status=status.HTTP_200_OK)