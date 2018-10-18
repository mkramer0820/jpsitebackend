from django.shortcuts import render
from rest_framework import generics, mixins
# Create your views here.
from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter

from .serializers import TodosSerializer, TodosGroupSerializer, Todos, TodosGroup

class TodoGroupCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = TodosGroup.objects.all()
    serializer_class = TodosGroupSerializer


class TodoGroupCreateRUDView(generics.RetrieveUpdateDestroyAPIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = TodosGroupSerializer
    queryset = TodosGroup.objects.all()

class TodoGroupFilterView(generics.ListAPIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = TodosGroupSerializer

    def get_queryset(self):
        queryset = TodosGroup.objects.all()
        group_name = self.request.query_params.get('group_name', None)
        if group_name is not None:
            queryset = queryset.objects.filter(group_name=group_name)
        return queryset





class TodoCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Todos.objects.all()
    serializer_class = TodosSerializer

class TodosRUD(generics.RetrieveUpdateDestroyAPIView):

    queryset = Todos.objects.all()
    serializer_class = TodosSerializer




class TodosGroupViewSet(viewsets.ModelViewSet):
    __basic_fields = ('id', 'group_name')
    queryset = TodosGroup.objects.all()
    serializer_class = TodosGroupSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_fields = __basic_fields
    search_fields = __basic_fields

"""

class StageFilter(FilterSet):
       #this is the base filter
        #based on the intermediate table middlewarespec
        #to filter specific attributes that are related to middlewarespecification
    middleware = filters.CharFilter(label='Middleware',
            name='middlewarespecification__middleware__name',
            distinct=True)
    service_level = filters.CharFilter(label='Service Level',
            name='middlewarespecification__service_level',
            distinct=True)
    tshirt_size = filters.CharFilter(label='Tshirt Size',
            name='middlewarespecification__tshirt_size',
            distinct=True)

    class Meta:
        model = Stage
        fields = ('middleware',
                  'tshirt_size',
                  'service_level')


33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333

test
from django.db import models
from django.contrib.contenttypes.fields import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation


class A(models.Model):
    name = models.CharField(max_length=256, blank=False, null=False)


class B(models.Model):
    name = models.CharField(max_length=256, blank=False, null=False)
    a = models.ForeignKey('A',
                          models.DO_NOTHING,
                          blank=True,
                          null=True,
                          related_name='b_rel')
    content_type = models.ForeignKey(ContentType, models.DO_NOTHING)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

views.py                  
from .serializers import *
from projects.models import A, B
from rest_framework.viewsets import ModelViewSet


class ASerializer(serializers.ModelSerializer):
    class Meta:
        model = A
        fields = [
            'name',
            'b_rel',
        ]


class AViewSet(ModelViewSet):
    serializer_class = ASerializer
    queryset = A.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = [
        'name',
        'b_rel',
    ]


from django.conf.urls import include, url
from rest_framework import routers
from projects.views import AViewSet

router = routers.DefaultRouter()

router.register(r'a', AViewSet, 'projects-a')

urlpatterns = [
    url(r'^api/your-app-name/', include(router.urls)),
]


"""