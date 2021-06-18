from io import BytesIO

from django.conf import settings
from django.db import models
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile
from PIL import Image


def resize_image(image_field, width, height):
    """
    Resizes an image from a Model.ImageField and returns a new image as a ContentFile
    """
    img = Image.open(image_field.path)
    new_img = img.resize((width, height))
    buffer = BytesIO()
    new_img.save(fp=buffer, format='JPEG')
    return ContentFile(buffer.getvalue())


def new_image(file):
    name = file.name.split('/')[-1]
    splited_name = name.split('.')
    img_name = splited_name[0] + '_thumbnail.' + splited_name[1]
    image_height = file.height
    image_width = file.width
    crop_coef = image_height / settings.CROP_HEIGHT
    new_heigth = int(image_height / crop_coef)
    new_widht = int(image_width / crop_coef)
    pillow_image = resize_image(
        file,
        width=new_widht,
        height=new_heigth)

    file_in_memory = InMemoryUploadedFile(
        pillow_image,  # file
        None,  # field_name
        img_name,  # file name
        'image/jpeg',  # content_type
        pillow_image.tell,  # size
        None)  # content_type_extra
    return img_name, file_in_memory


# assuming your Model instance is called `instance`

class GalleryImage(models.Model):
    image = models.ImageField(upload_to='media/galery')
    image_cropped = models.ImageField(upload_to='media/galery', null=True, blank=True)
    alt = models.CharField(default="Gallery image", max_length=100)

    def save(self, *args, **kwargs):
        super(GalleryImage, self).save(*args, *kwargs)
        if not self.image_cropped:
            name, file = new_image(self.image)
            self.image_cropped.save(name, file)

    def __str__(self):
        return self.image.name.split('/')[-1]


class Quiz(models.Model):
    name = models.CharField(max_length=100)
    count = models.PositiveSmallIntegerField()
    need_room_in_kh = models.BooleanField(default=False)
    need_room_in_penates = models.BooleanField(default=False)
    transfer_to = models.BooleanField(default=False)
    transfer_from_first_day = models.BooleanField(default=False)
    transfer_from_second_day = models.BooleanField(default=False)
