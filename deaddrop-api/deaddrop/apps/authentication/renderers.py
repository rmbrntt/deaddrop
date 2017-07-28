from deaddrop.apps.core.renderers import DeadDropJSONRenderer
import json


class UserJSONRenderer(DeadDropJSONRenderer):

    object_label = 'user'
    object_label_plural = 'users'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        token = data.get('token', None)

        if token is not None and isinstance(token, bytes):
            data['token'] = token.decode('utf-8')

        return super(UserJSONRenderer, self).render(data)