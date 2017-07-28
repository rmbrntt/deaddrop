from rest_framework.generics import RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Profile
from .renderers import ProfileRenderer
from .serializers import ProfileSerializer
from .exceptions import ProfileDoesNotExist

class ProfileRetrieveAPIView(RetrieveAPIView):

    permission_classes = (AllowAny,)
    renderer_classes = (ProfileRenderer,)
    serializer_class = ProfileSerializer


    def retrieve(self, request, username, *args, **kwargs):

        try:

            profile = Profile.objects.select_related('user').get(user__username=username)

        except Profile.DoesNotExist:
            raise ProfileDoesNotExist

        serializer = self.serializer_class(profile)

        return Response(data=serializer.data, status=status.HTTP_200_OK)