from rest_framework import serializers
from .models import JobApplication

class JobApplicationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = JobApplication
        fields = ['id', 'user', 'company_name', 'position', 'status', 'applied_date']