
from rest_framework import serializers
from inventory.models import Inventory, Spec

from customer.serializers import CustomerSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status



class SpecListSerializer(serializers.ModelSerializer):

    spec_type = serializers.CharField(source='spec', read_only=True)
    spec_size = serializers.CharField(source='size', read_only=True)

    class Meta:
        model = Spec
        fields = '__all__'


class InventorylistCreateSerializer(serializers.ModelSerializer):


    class Meta:
        model = Inventory
        fields = '__all__'


class InventorylistSerializer(serializers.ModelSerializer):


    spec = SpecListSerializer(many=True)

    class Meta:
        model = Inventory
        fields = '__all__'

    def create(self, validated_data):
        specs_data = validated_data.pop('spec')
        inventory = Inventory.objects.create(**validated_data)
        for spec_data in specs_data:
            Spec.objects.create(inventory=inventory, **spec_data)
        return inventory
