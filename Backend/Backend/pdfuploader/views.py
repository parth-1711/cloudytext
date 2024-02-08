from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UploadedPDF
from .serializers import UploadedPDFSerializer
from rest_framework.decorators import api_view
from pypdf import PdfReader
import os
import wordcloud
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
from io import BytesIO
import base64

@api_view(['GET'])
def getData(request):
    return Response({'meassage':'hello'})

class PDFUploadView(APIView):

    def post(self, request, format=None):
        # print(request.data)
        serializer = UploadedPDFSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print(serializer.data['pdf_file'])
            index=len(UploadedPDF.objects.all())
            queryset=UploadedPDF.objects.get(id=index)

            file_path="/".join(serializer.data['pdf_file'].split('/')[2:])
            try:
                reader = PdfReader(queryset.pdf_file)
                file_contents=""
                for i in range(len(reader.pages)+1):
                    file_contents += reader.pages[0].extract_text()
                
                cloud = wordcloud.WordCloud(width=800, height=400)
                output=cloud.generate(file_contents)
                queryset.pdf_file.delete()

                plt.imshow(output, interpolation='bilinear')
                plt.axis('off')
                img_buffer = BytesIO()
                plt.savefig(img_buffer, format='png')
                img_buffer.seek(0)
                img_str = base64.b64encode(img_buffer.getvalue()).decode()
                plt.close()
            except Exception as e:
                queryset.pdf_file.delete()
                return Response('Ensure that Uploaded document is a PDF', status=500)
            return Response({'image': img_str},status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)