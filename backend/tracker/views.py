from rest_framework import viewsets, permissions
from .models import JobApplication
from .serializers import JobApplicationSerializer

class JobApplicationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = JobApplicationSerializer

    def get_queryset(self):
        return JobApplication.objects.filter(user = self.request.user).order_by('-applied_date')
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)