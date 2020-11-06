import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public isAuthenticated: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private authorizeService: AuthorizeService,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
}
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
