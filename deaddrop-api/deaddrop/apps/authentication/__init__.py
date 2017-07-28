from django.apps import AppConfig

class AuthenticationConfig(AppConfig):

    name = 'deaddrop.apps.authentication'
    label = 'authentication'
    verbose_name = 'Authentication'

    def ready(self):
        import deaddrop.apps.authentication.signals


# Reminder how this magically works -- Django will pick up on the variable name default_app_config and register as the config
default_app_config = 'deaddrop.apps.authentication.AuthenticationConfig'