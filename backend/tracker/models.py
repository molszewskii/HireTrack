from django.db import models

from core import settings

# Create your models here.
class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("applied", "Wysłano"),
        ("interview", "Interview"),
        ("rejected", "Rejected"),
        ("offer", "Offer"),
    ]
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        related_name = "jobapplications"
    )

    company_name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    offer_utl = models.URLField(blank=True)
    applied_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default="applied")
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.position} w {self.company_name}"