import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/typings/paginator';
@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule { }
