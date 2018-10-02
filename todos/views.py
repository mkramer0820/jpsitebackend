from django.shortcuts import render
from rest_framework import generics, mixins
# Create your views here.

from .serializers import TodosSerializer, TodosGroupSerializer, Todos, TodosGroup

class TodoGroupCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = TodosGroup.objects.all()
    serializer_class = TodosGroupSerializer

    def get_todos(self):
        all = self.queryset
        todos = [i.todos_set.all().values() for i in all]
        return print(todos)

class TodoGroupCreateRUDView(generics.RetrieveUpdateDestroyAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = TodosGroup.objects.all()
    serializer_class = TodosGroupSerializer


class TodoCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Todos.objects.all()
    serializer_class = TodosSerializer

class TodosRUD(generics.RetrieveUpdateDestroyAPIView):

    queryset = Todos.objects.all()
    serializer_class = TodosSerializer

