import os
import uuid

import oss2
from oss2.exceptions import RequestError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from upload.models import Image
from upload.serializer import ImageSerializer

ACCESS_KEY_ID = os.getenv('ACCESS_KEY_ID')
ACCESS_SECRET = os.getenv('ACCESS_SECRET')
auth = oss2.Auth(ACCESS_KEY_ID, ACCESS_SECRET)
endpoint = 'http://oss-us-west-1.aliyuncs.com'
bucket = oss2.Bucket(auth, endpoint, 'coteam')  # 项目名称
base_file_url = 'https://silicone-factory.cn/'


def percentage(consumed_bytes, total_bytes):
    if total_bytes:
        rate = int(100 * (float(consumed_bytes) / float(total_bytes)))
        print('\r{0}%'.format(rate), end='')


def handle_upload(file, filename):
    file_name = base_file_url + filename
    try:
        res = bucket.put_object(filename, file, progress_callback=percentage)
        if res.status == 200:
            return file_name
    except RequestError:
        return False
    # finally:
    #     return False


class UploadFile(APIView):

    def post(self, request):
        filename = request.FILES.get('file').name
        file = request.FILES.get('file').read()
        file_url = handle_upload(file, filename)
        if file_url:
            return Response({"msg": "upload successfully", "file_url": file_url}, status=status.HTTP_201_CREATED)
        else:
            return Response({"msg": "upload failed"}, status=status.HTTP_400_BAD_REQUEST)


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

