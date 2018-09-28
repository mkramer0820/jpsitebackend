import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { FactoryListComponent } from './factory-list/factory-list.component';
import { FactoryCreateComponent } from './factory-create/factory-create.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { MyNavComponent } from './my-nav/my-nav.component';


const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '' ,
    component: MyNavComponent
  }
  {
    path: 'customer',
    component: CustomerListComponent
  },
  {
    path: 'create-customer',
    component: CustomerCreateComponent
  },
  {
    path: 'factories',
    component: FactoryListComponent
  },
  {
    path: 'create-factory',
    component: FactoryCreateComponent
  },
  {
    path: 'orders',
    component: OrderListComponent
  },
  {
    path: 'create-order',
    component: OrderCreateComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'create-task',
    component: TaskCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
