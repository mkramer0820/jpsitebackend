"""jpsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from django.conf.urls.static import static
from django.views.static import serve
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token


from customer.views import CustomerCreateView, CustomerDetailView
from orders.views import OrderCreateView, OrderDetailView, OrderExpenseCreateView, OrderExpenseRUD
from factory.views import FactoryCreateView, FactoryDetailView, FactoryContacListtCreateView, FactoryContactDetailView
from inventory.views import InventoryListCreateView, SpecListCreateView,InventoryDetailView, \
                            SpecDetailView, InventoryListView

from orders.views import OrdersTest, OrderTaskView, OrderTaskRUD, OrderListFilterView, TaskDashBoardView
from todos.views import TodoCreateView, TodoGroupCreateView,TodosRUD, TodoGroupCreateRUDView, \
    TodosGroupViewSet

from jpsiteapi.settings import MEDIA_URL, MEDIA_ROOT




urlpatterns = [



    url(r'^jet/',
        include('jet.urls', 'jet')),
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    url(r'admin/',
            admin.site.urls,
            name='admin'),

    url(r'^media/(?P<path>.*)$',
        serve,
        {'document_root': MEDIA_ROOT}),

    url(r'',
        include('home.urls',
                namespace='home')),

    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),


    path('task/',
         TodoCreateView.as_view(),
         name='todos'
         ),
    path('task/<int:pk>/',
         TodosRUD.as_view(),
         name='todos-RUD'
         ),
    path('task/group/',
         TodoGroupCreateView.as_view(),
         name='todos-create'
         ),
    path('task/group/filter/',
         TodosGroupViewSet.as_view({'get': 'list'}),
         name='todos-group-filter'),

    path('task/group/<int:pk>/',
         TodoGroupCreateRUDView.as_view(),
         name='todosgroup-detail'
         ),
    path('factory/',
         FactoryCreateView.as_view(),
         name='factory-list'),
    path('factory/<int:pk>/',
         FactoryDetailView.as_view(),
         name='factory-detail'),
    path('factory/contacts/',
         FactoryContacListtCreateView.as_view(),
         name='factory-contact-list'
         ),
    path('factory/contacts/<int:id>',
         FactoryContactDetailView.as_view(),
         name='factory-contact-list'
         ),


    path('customer/',
         CustomerCreateView.as_view(),
         name='customer-list'),
    path('customer/<int:pk>/',
         CustomerDetailView.as_view(),
         name='customer-detail'),

    path('myorders/',
         OrdersTest.as_view(),
         name='orders-test'),
    path('orders/',
         OrderCreateView.as_view(),
         name='order-list'),
    path('orders/filters/',
         OrderListFilterView.as_view({'get': 'list'}),
         name='order-list-filter'),
    path('orders/<int:pk>/',
         OrderDetailView.as_view(),
         name='order-detail'),
    path('orders/tasks/',
         OrderTaskView.as_view(),
         name='list-order-task'
         ),
    path('orders/tasks/<int:pk>',
         OrderTaskRUD.as_view(),
         name='list-order-task'
         ),

    path('order-expense/',
         OrderExpenseCreateView.as_view(),
         name='order-expense'),
    path('order-expense/<int:pk>/',
         OrderExpenseRUD.as_view(),
         name='order-epxense-rud'),


    path('inventory/',
         InventoryListCreateView.as_view(),
         name='inventory-create'),
    path('inventorylist/',
         InventoryListView.as_view(),
         name='inventory-list'),
    path('inventory/<int:pk>/',
         InventoryDetailView.as_view(),
         name='inventory-detail'),

    path('inventory/specs/',
         SpecListCreateView.as_view(),
         name='spec-list'),
    path('inventory/specs/<int:pk>/',
         SpecDetailView.as_view(),
         name='inventory-detail'),

    path('dashboard/',
         TaskDashBoardView.as_view(),
         name='dashboard'
         ),


]

static(MEDIA_URL, document_root=MEDIA_ROOT)


"""
useful regex urls
pk (?P<pk>\d+)
slug : (?P<slug>[-\w]+)
slug + pk (?P<slug>[-\w]+)-(?P<pk>\d+)
(?P<username>[\w.@+-]+)

dates = (?P<year>[0-9]{4})
year mont  = (?P<year>[0-9]{4})/(?P<month>[0-9]{2})
ymd (?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})


"""
#from django.http import HttpResponse, request
"""
import datetime

now = datetime.date.today()

def hello(request):
    return HttpResponse("Hello World")

def today(request):
    return HttpResponse(now)
    
def current_date(request):
    import datetime
    now = datetime.datetime.now()
    html = "<html><body> It is now %s. </body></html>" % now
    return HttpResponse(html)
    



    path('task/',
         TaskCreateView.as_view(),
         name='task-list'),
    path('task/<int:pk>/',
         TaskDetailView.as_view(),
         name='task-detail'),

"""

