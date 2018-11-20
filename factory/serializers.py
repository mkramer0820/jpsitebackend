from rest_framework import serializers
from factory.models import Factory, FactoryContact




class FactoryContactSerializer(serializers.ModelSerializer):


    class Meta:

        model = FactoryContact
        fields = '__all__'

class FactoryListSerializer(serializers.ModelSerializer):

    contacts = serializers.SerializerMethodField()
    contact_name = serializers.PrimaryKeyRelatedField(queryset=FactoryContact.objects.all(), read_only=False, required=False, allow_null=True)


    class Meta:

        model = Factory
        #fields = '__all__'
        exclude = ['createdOn']

    def get_contacts(self, obj):
        qs = obj.contact_name
        return FactoryContactSerializer(qs).data




"""
class OrderlistSerializer(serializers.ModelSerializer):


    buyer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    factory = serializers.PrimaryKeyRelatedField(queryset=Factory.objects.all())
    buyer_name = serializers.ReadOnlyField(source='buyer.name')
    factory_name = serializers.ReadOnlyField(source='factory.name')
    tasks = serializers.SerializerMethodField()
    due_date = serializers.DateTimeField()
    factory_ship_date = serializers.DateTimeField()

    class Meta:
        model = Orders
        #fields = '__all__'
        exclude = ('jp_style_number_test',)
        depth = 2

    def get_tasks(self, obj):

        qs = obj.ordertasks_set.all()
        return OrderTaskSerializer(qs, many=True, read_only=True).data
"""