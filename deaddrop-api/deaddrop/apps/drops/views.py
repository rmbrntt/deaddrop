from rest_framework.response import Response
from rest_framework import status, mixins, generics, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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

class DropViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):

    queryset = Drop.objects.select_related('agent', 'agent__user')
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (DropJSONRenderer,)
    serializer_class = DropSerializer

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



