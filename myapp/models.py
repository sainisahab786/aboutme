from django.db import models
from django.utils import timezone

# Create your models here.

class Contact(models.Model):
    SUBJECT_CHOICES = [
        ('job-opportunity', 'Job Opportunity'),
        ('collaboration', 'Project Collaboration'),
        ('consultation', 'Technical Consultation'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
