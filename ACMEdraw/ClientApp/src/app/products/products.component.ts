import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.css']
})
export class ProductsComponent {
  public products: Product[];
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }
  ngOnInit() {
    this.http.get<Product[]>(this.baseUrl + 'api/Products')
      .subscribe(result => {
        this.products = result;
      }, error => console.error(error));
  }
}
