from customer.models import Customer
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect



class CustomerSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Customer

        fields = '__all__'

    def get(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = CustomerSerializer(customer, data=request.data)
        if not serializer.is_valid():
            return Response({'serializer': serializer, 'customer_detail': customer})
        serializer.save()
        return redirect('customer-list')