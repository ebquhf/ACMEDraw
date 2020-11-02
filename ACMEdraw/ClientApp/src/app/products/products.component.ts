import { Component, Inject,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.css']
})
export class ProductsComponent {
  public displayedColumns: string[] = ['id', 'name', 'serialNumber'];
  public products: Product[];

  pageEvent: PageEvent;
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
