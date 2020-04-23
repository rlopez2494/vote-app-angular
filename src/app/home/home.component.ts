import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  email: String;
  password: String;
  registerSubmission: FormGroup;
  loginSubmission: FormGroup;
  showRegister: boolean = false;

  ngOnInit() {
    
    this.registerSubmission = new FormGroup({
      'name': new FormControl(
        null, 
        [
          Validators.required, 
          Validators.minLength(2), 
          Validators.maxLength(15)
        ]),

      'lastName': new FormControl(
        null,
        [
          Validators.required, 
          Validators.minLength(2), 
          Validators.maxLength(15)
        ]),

      'email': new FormControl(
        null,
        [Validators.required, Validators.email]),

      'password': new FormControl(
        null,
        [Validators.required, Validators.minLength(8)]),
      
      'repeatPassword': new FormControl(
        null,
        [
          Validators.required, 
          Validators.minLength(8),
          this.passwordIsDifferent.bind(this)
        ]),
    })

    this.loginSubmission = new FormGroup({
      'email': new FormControl(null,
        [Validators.required, Validators.email]),
      'password': new FormControl(null,
        [Validators.required]),
    })

  }

  passwordIsDifferent(control: FormControl): { [s: string]: boolean } {
    if (control.value) {

      const { value }  = control;
      const { password } = this.registerSubmission.value;
      
      if(value === password) {
        return null;
      } else {
        return {'passwordIsDifferent': true}
      }
    }
  }

  onShowRegister() {
    this.showRegister = true;
  }

  onCancelSignUp() {
    this.showRegister = false;
  }

  onLoginSubmit(formElement: HTMLFormElement) {
    const { email, password } = formElement.value;
    console.log(formElement)

    this.userService.loginUser(email, password)
    .subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  onRegisterSubmit() {
    const registerBody = { ...this.registerSubmission.value };
    delete registerBody['repeatPassword'];
    this.userService.registerUser(registerBody)
      .subscribe((responseData: any) => {
        console.log(responseData)
      }, (error) => {
        console.log(error.error)
      })
    
  }

}
