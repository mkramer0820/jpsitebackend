from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import JSONField


class TodosGroup(models.Model): #Todolist able name that inherits models.Model

    group_name = models.CharField(max_length=50, unique=True) # a varchar

    def __str__(self):
        return self.group_name #name to be shown when called

class Todos(models.Model): # The Category table name that inherits models.Model

    todos_group = models.ForeignKey(TodosGroup, null=True, blank=True, on_delete='CASCADE')
    set_name = models.CharField(max_length=50, null=True, blank=True)
    todos = JSONField(default=dict)


    class Meta:
        verbose_name = ("Task list")
        verbose_name_plural = ("Task lists")

