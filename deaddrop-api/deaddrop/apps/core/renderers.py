from rest_framework.renderers import JSONRenderer
import json
from rest_framework.utils.serializer_helpers import ReturnList

class DeadDropJSONRenderer(JSONRenderer):

    charset = 'utf-8'
    object_label = 'object'
    object_label_plural = 'objects'

    def render(self, data, accepted_media_type=None, renderer_context=None):

        if isinstance(data, ReturnList):
            _data = json.loads(super(DeadDropJSONRenderer, self).render(data).decode('utf-8'))

            return json.dumps({self.object_label_plural: _data})
        else:
            errors = data.get('errors', None)
            if errors is not None:
                return super(DeadDropJSONRenderer, self).render(data)

            return json.dumps({
                self.object_label: data
            })
