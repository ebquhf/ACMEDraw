import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';//import contracts hereimport { Draw, Person,Product } from './Contracts'@Component({
  selector: 'app-home-new-draw',
  templateUrl: './home-new-draw.component.html',
  styleUrls: ['./home-new-draw.component.css']
})export class HomeNewDrawComponent {  // the view title
  title: string;
  // the form model
  form: FormGroup;

  //new draw to save
  draw: Draw;
  id?: number;
  products: Product[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      serialNumber: new FormControl('')
    });
    this.loadData();
  }
  loadData() {
    //load products
    this.loadProducts();
    // retrieve the ID from the 'id' parameter
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      //edit mode
      var url = this.baseUrl + "api/draws/" + this.id;
      this.http.get<Draw>(url).subscribe(result => {
        this.draw = result;
        this.title = "Edit - " + this.draw.email;
        // update the form with the draw value
        this.form.patchValue(this.draw);
      }, error => console.error(error));
    } else {
      //ADD new draw
      this.title = "Enter the draw to win!"

    }
  }
  loadProducts() {
    var url = this.baseUrl + "api/products";
    this.http.get<Product[]>(url).subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }
  onSubmit() {
    var draw = (this.id) ? this.draw : <Draw>{};
    draw.email = this.form.get("email").value;

    draw.firstName = this.form.get("firstName").value;
    draw.lastName = this.form.get("lastName").value;
    draw.serialNumber = this.form.get("serialNumber").value;

   
    if (this.id) {
      var url = this.baseUrl + "api/draws/" + this.draw.id;
      this.http
        .put<Draw>(url, draw)
        .subscribe(result => {
          console.log("Draw " + draw.id + " has been updated.");
          this.router.navigate(['/home']);
        }, error => console.log(error));
    } else {
      var url = this.baseUrl + "api/draws"
      this.http
        .post<Draw>(url, draw)
        .subscribe(result => {
          console.log("Draw " + draw.id + " has been added.");
          // go back to cities view
          this.router.navigate(['/home']);
        }, error => console.log(error));
    }

  }
}
