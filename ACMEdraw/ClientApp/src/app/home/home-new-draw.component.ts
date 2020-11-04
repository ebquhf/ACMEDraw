import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';//import contracts hereimport { Draw } from './Contracts'@Component({
  selector: 'app-home-new-draw',
  templateUrl: './home-new-draw.component.html',
  styleUrls: ['./home-new-draw.component.css']
})export class HomeNewDrawComponent {  // the view title
  title: string;
  // the form model
  form: FormGroup;
  // the city object to edit
  draw: Draw;
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
  }
  loadData() {
    
    // retrieve the ID from the 'id' parameter
    var id = +this.activatedRoute.snapshot.paramMap.get('id');
    // fetch the city from the server
    var url = this.baseUrl + "api/draws/" + id;
    this.http.get<Draw>(url).subscribe(result => {
      this.draw = result;
      this.title = "Edit - " + this.draw.email;
      // update the form with the city value
      this.form.patchValue(this.draw);
    }, error => console.error(error));
  }
  onSubmit() {
    var draw = this.draw;
    draw.email = this.form.get("email").value;
    draw.firstName = this.form.get("firstName").value;
    draw.lastName = this.form.get("lastName").value;
    draw.serialNumber = this.form.get("serialNumber").value;

    var url = this.baseUrl + "api/draw/" + this.draw.id;
    this.http
      .post<Draw>(url, draw)
      .subscribe(result => {
        console.log("Draw " + draw.id + " has been updated.");
        // go back to cities view
        this.router.navigate(['/home']);
      }, error => console.log(error));
  }
}
