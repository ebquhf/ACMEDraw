import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product,Draw,Person } from './Contracts';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public draw: Draw;
  public person: Person;
  public product: Product;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    
  }
  sendData(event: PageEvent) {
    this.http.post(this.baseUrl + 'api/Draws', JSON.stringify(this.draw)).subscribe(result => {
      console.log(result);
    }, error => console.error(error));

    }
  }

