import uuid

import oss2
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

# TODO:图片上传至阿里云0SS

# 这个是需要用特定的地址，不同地域的服务器地址不同，不要弄错了
from rest_framework.viewsets import ModelViewSet

from upload.models import Image
from upload.serializer import ImageSerializer

auth = oss2.Auth('LTAI4Fxw19R4SyZPtHeJ9A2U', 'uOEyNzvbXMtzRCXX5jjaOhxx1kwgPz')
endpoint = 'http://oss-us-west-1.aliyuncs.com'
bucket = oss2.Bucket(auth, endpoint, 'coteam')  # 项目名称
base_file_url = 'https://silicone-factory.cn/'


def percentage(consumed_bytes, total_bytes):
    if total_bytes:
        rate = int(100 * (float(consumed_bytes) / float(total_bytes)))
        print('\r{0}%'.format(rate), end='')


def handle_upload(file, filename):
    file_name = base_file_url + filename
    res = bucket.put_object(filename, file, progress_callback=percentage)
    if res.status == 200:
        return file_name
    else:
        return False


class UploadFile(APIView):

    def post(self, request):
        filename = request.FILES.get('file').name
        file = request.FILES.get('file').read()
        file_url = handle_upload(file, filename)
        print(file_url)
        return Response({"msg": "upload successfully"}, template_name='upload.html')


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
