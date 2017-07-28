from deaddrop.apps.core.renderers import DeadDropJSONRenderer


class DropJSONRenderer(DeadDropJSONRenderer):
    object_label = 'drop'
    object_label_plural = 'drops'

    def render(self, data, accepted_media_type=None, renderer_context=None):

        return super(DropJSONRenderer, self).render(data)