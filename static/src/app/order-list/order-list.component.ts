import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  private orders: Array<object> = [];
  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.getOrders();
    }

  public getOrders(){
    this.apiService.getOrders().subscribe((data: Array<object>) => {
      this.orders = data;
      console.log(data);
    });
  }
}
