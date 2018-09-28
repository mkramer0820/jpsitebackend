from rest_framework import serializers
from factory.models import Factory, FactoryContact


class FactoryListSerializer(serializers.ModelSerializer):

    class Meta:

        model = Factory
        fields = '__all__'


class FactoryContactSerializer(serializers.ModelSerializer):

    class Meta:

        model = FactoryContact
        fields = '__all__'

