from rest_framework import serializers
from todos.models import TodosGroup, Todos



class TodosSerializer(serializers.ModelSerializer):

    todos = serializers.JSONField
    group_name = serializers.ReadOnlyField(source='todos_group.group_name')


    class Meta:
        model = Todos
        fields = '__all__'

class TodosOnlySerializer(serializers.ModelSerializer):

    todos = serializers.JSONField

    class Meta:
        model = Todos
        fields = 'todos'


class TodosGroupSerializer(serializers.ModelSerializer):



    class Meta:
        model = TodosGroup
        fields = '__all__'
