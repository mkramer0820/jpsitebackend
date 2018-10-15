from rest_framework import serializers
from todos.models import TodosGroup, Todos
from rest_framework import fields



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
        fields = ('set_name', 'id')

class TodosGroupSerializer(serializers.ModelSerializer):

    set_names = TodosOnlySerializer(source='todos_set', many=True, read_only=True)


    class Meta:
        model = TodosGroup
        fields = '__all__'
