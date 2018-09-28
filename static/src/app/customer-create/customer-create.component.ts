import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services';

@Component({

  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

   constructor(private apiService: APIService) { }

    ngOnInit() {
    }

    createCustomer() {
      var customer ={
        "name": "Cost NZ",
        "slug": "",
        "address1": "Home N",
        "address2": "333 apt 300",
        "address3": "",
        "country": "USA",
        "state-prov": "NY",
        "zip": "10001",
        "email": "",
        "phone": "9179292222",
        "website": "",
        "description": "test angular",
        "isActive": true
        };

        this.apiService.createCustomer(customer).subscribe((response) => {
          console.log(response);
     });
  }
}
