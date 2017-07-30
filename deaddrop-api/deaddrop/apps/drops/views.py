from rest_framework.response import Response
from rest_framework import status, mixins, generics, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound

from .models import Drop
from .renderers import DropJSONRenderer
from .serializers import DropSerializer




# class DropListCreateAPIView(generics.ListCreateAPIView):
#
#     renderer_classes = (DropJSONRenderer,)
#     queryset = Drop.objects.all()
#     serializer_class = DropSerializer
#
#     def list(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         serializer = DropSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, *args, **kwargs):
#
#         serializer = DropSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class DropViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):

    queryset = Drop.objects.select_related('agent', 'agent__user')
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (DropJSONRenderer,)
    serializer_class = DropSerializer
    lookup_field = 'id'

    def _check_exists(self, id):
        try:
            serializer_instance = self.queryset.get(id=id)
            return serializer_instance

        except Drop.DoesNotExist:
            raise NotFound('A drop with this id does not exist.')

    def create(self, request, *args, **kwargs):

        serializer_context = {'agent': request.user.profile}
        serializer_data = request.data.get('drop', {})

        serializer = self.serializer_class(
            data=serializer_data,
            context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, id):

        serializer_instance = self._check_exists(id)

        serializer_data = request.data.get('drop', {})
        serializer = self.serializer_class(serializer_instance, serializer_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, id):

        serializer_instance = self._check_exists(id)
        serializer = self.serializer_class(serializer_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def destroy(self, request, id, *args, **kwargs):
        drop = self._check_exists(id)
        drop.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)


