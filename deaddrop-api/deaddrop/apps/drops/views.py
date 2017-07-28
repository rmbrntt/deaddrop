from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from .serializers import DropSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Drop
from .renderers import DropJSONRenderer


class DropListCreateAPIView(ListCreateAPIView):

    renderer_classes = (DropJSONRenderer,)
    queryset = Drop.objects.all()
    serializer_class = DropSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = DropSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):

        serializer = DropSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



