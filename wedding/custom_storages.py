# custom_storages.py
from django.conf import settings
from storages.backends.s3boto3 import S3ManifestStaticStorage


class StaticStorage(S3ManifestStaticStorage):
    location = settings.STATICFILES_LOCATION


class MediaStorage(S3ManifestStaticStorage):
    location = settings.MEDIAFILES_LOCATION
