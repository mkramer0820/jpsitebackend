import { Component, OnInit } from '@angular/core';
import { APIService } from '../_services';

@Component({
  selector: 'app-factory-list',
  templateUrl: './factory-list.component.html',
  styleUrls: ['./factory-list.component.css']
})
export class FactoryListComponent implements OnInit {
  private factory: Array<object> = [];
  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.getFactories();
    }
  public getFactories(){
     this.apiService.getFactories().subscribe((data: Array<object>) => {
        this.factory = data;
        console.log(data);
     });
  }
}
