import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  email: String;
  password: String;

  ngOnInit() { }

  onSubmit(formElement: HTMLFormElement) {
    const { email, password } = formElement.value;

    const urlString = 'http://localhost:9000/users/login';
    const body = { email, password };

    this.http.post(urlString, body)
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

}
