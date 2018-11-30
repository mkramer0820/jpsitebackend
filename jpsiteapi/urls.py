"""jpsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('api/', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('api/', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('api/blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from django.conf.urls.static import static
from django.views.static import serve
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from customer.views import CustomerCreateView, CustomerDetailView
from orders.views import OrderCreateView, OrderDetailView, OrderExpenseCreateView, OrderExpenseRUD, OrdersDestroyView, \
                         SweaterSizeCreateView
from factory.views import FactoryCreateView, FactoryDetailView, FactoryContacListtCreateView, FactoryContactDetailView
from inventory.views import InventoryListCreateView, SpecListCreateView,InventoryDetailView, \
                            SpecDetailView, InventoryListView

from orders.views import OrdersTest, OrderTaskView, OrderTaskRUD, OrderListFilterView, TaskDashBoardView, OrderChartView
from todos.views import TodoCreateView, TodoGroupCreateView,TodosRUD, TodoGroupCreateRUDView, \
    TodosGroupViewSet
from home.views import index

from jpsiteapi.settings import MEDIA_URL, MEDIA_ROOT




urlpatterns = [

    path('grappelli/', include('grappelli.urls')),  # grappelli URLS

    path('api/admin/', admin.site.urls),

    url(r'^media/(?P<path>.*)$',
        serve,
        {'document_root': MEDIA_ROOT}),

    url(r'',
        include('home.urls',
                namespace='home')),

    url(r'api/api-token-auth/', obtain_jwt_token),
    url(r'api/api-token-refresh/', refresh_jwt_token),
    url(r'api/api-token-verify/', verify_jwt_token),


    path('api/task/',
         TodoCreateView.as_view(),
         name='todos'
         ),
    path('api/task/<int:pk>/',
         TodosRUD.as_view(),
         name='todos-RUD'
         ),
    path('api/task/group/',
         TodoGroupCreateView.as_view(),
         name='todos-create'
         ),
    path('api/task/group/filter/',
         TodosGroupViewSet.as_view({'get': 'list'}),
         name='todos-group-filter'),

    path('api/task/group/<int:pk>/',
         TodoGroupCreateRUDView.as_view(),
         name='todosgroup-detail'
         ),
    path('api/factory/',
         FactoryCreateView.as_view(),
         name='factory-list'),
    path('api/factory/<int:pk>/',
         FactoryDetailView.as_view(),
         name='factory-detail'),
    path('api/factory/contacts/',
         FactoryContacListtCreateView.as_view(),
         name='factory-contact-list'
         ),
    path('api/factory/contacts/<int:pk>/',
         FactoryContactDetailView.as_view(),
         name='factory-contact-list'
         ),


    path('api/customer/',
         CustomerCreateView.as_view(),
         name='customer-list'),
    path('api/customer/<int:pk>/',
         CustomerDetailView.as_view(),
         name='customer-detail'),

    path('api/myorders/',
         OrdersTest.as_view(),
         name='orders-test'),
    path('api/orders/',
         OrderCreateView.as_view(),
         name='order-list'),
    path('api/orders/paginator/',
         OrderListFilterView.as_view({'get': 'list'}),
         name='order-list-filter'),
    path('api/orders/delete/<int:pk>/',
         OrdersDestroyView.as_view(), name='delete-orders'),
    path('api/orders/<int:pk>/',
         OrderDetailView.as_view(),
         name='order-detail'),
    path('api/orders/tasks/',
         OrderTaskView.as_view(),
         name='list-order-task'
         ),
    path('api/orders/tasks/<int:pk>',
         OrderTaskRUD.as_view(),
         name='list-order-task'
         ),

    path('api/order-expense/',
         OrderExpenseCreateView.as_view(),
         name='order-expense'),
    path('api/order-expense/<int:pk>/',
         OrderExpenseRUD.as_view(),
         name='order-epxense-rud'),
    path('api/sweater-sizes/',
         SweaterSizeCreateView.as_view(), name='sweater-sizes'),

    path('api/inventory/',
         InventoryListCreateView.as_view(),
         name='inventory-create'),
    path('api/inventorylist/',
         InventoryListView.as_view(),
         name='inventory-list'),
    path('api/inventory/<int:pk>/',
         InventoryDetailView.as_view(),
         name='inventory-detail'),

    path('api/inventory/specs/',
         SpecListCreateView.as_view(),
         name='spec-list'),
    path('api/inventory/specs/<int:pk>/',
         SpecDetailView.as_view(),
         name='inventory-detail'),

    path('api/dashboard/',
         TaskDashBoardView.as_view(),
         name='dashboard'
         ),

    path('api/orders-chart/',
         OrderChartView.as_view(),
         name='order-chart'),

    url(r'$', index),


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
    



    path('api/task/',
         TaskCreateView.as_view(),
         name='task-list'),
    path('api/task/<int:pk>/',
         TaskDetailView.as_view(),
         name='task-detail'),

"""

