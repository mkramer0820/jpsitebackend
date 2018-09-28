import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class APIService {

  API_URL = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) {}

  getCustomers(){
    return this.httpClient.get(`${this.API_URL}/customer/`);
  }

  createCustomer(customer){
    return this.httpClient.post(`${this.API_URL}/customer/`, customer);
  }

  getFactories(){
    return this.httpClient.get(`${this.API_URL}/factory/`)
  }

  getOrders(){
    return this.httpClient.get(`${this.API_URL}/orders/`)
  }
  getTasks(){
    return this.httpClient.get(`${this.API_URL}/task/`)
  }
}
