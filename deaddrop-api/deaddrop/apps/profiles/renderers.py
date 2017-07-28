from deaddrop.apps.core.renderers import DeadDropJSONRenderer


class ProfileRenderer(DeadDropJSONRenderer):

    object_label = 'profile'
    object_label_plural = 'profiles'


    def render(self, data, accepted_media_type=None, renderer_context=None):
        return super(ProfileRenderer, self).render(data)