from rest_framework import viewsets
from .models import Income
from financeapp.serializers import IncomeSerializer

class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
