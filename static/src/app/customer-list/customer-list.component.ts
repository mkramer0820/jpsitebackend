import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private customer: Array<object> = [];
  constructor(private apiService: APIService) { }
    ngOnInit() {
      this.getCustomers();
    }

  public getCustomers(){
     this.apiService.getCustomers().subscribe((data: Array<object>) => {
        this.customer = data;
        console.log(data);
     });
  }
}
