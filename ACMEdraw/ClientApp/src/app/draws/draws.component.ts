import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Draw } from './draw';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-draws',
  templateUrl: './draws.component.html',
  styleUrls: ['./draws.component.css']
})
export class DrawsComponent {
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'productName', 'isWinning'];
  public draws: Draw[];
  public drawSlice: Draw[];

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string) {
  }
  ngOnInit() {
    this.http.get<Draw[]>(this.baseUrl + 'api/draws/getdraws')
      .subscribe(result => {
        this.draws = result;
        this.drawSlice = this.draws.slice(0, 10);
      }, error => console.error(error));
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.draws.length) {
      endIndex = this.draws.length;
    }
    this.drawSlice = this.draws.slice(startIndex, endIndex);
  }
  onSubmit() {

    this.http.get<any>(this.baseUrl + 'api/draws/getwinner')
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/draw']);
        }
      }, error => console.error(error));

    this.router.navigate(['']);
  }
}
