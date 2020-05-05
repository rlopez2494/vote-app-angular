// Core imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

// Components / Services
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  email: String;
  password: String;
  registerSubmission: FormGroup;
  loginSubmission: FormGroup;
  showRegister: boolean = false;
  isLoading: boolean = false;
  error: string = null;

  authObs: Observable<AuthResponseData>;
  authSubject: Subject< Observable<AuthResponseData> >;


  ngOnInit() {
    this.authSubject = new Subject< Observable<AuthResponseData> >();
    
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

    this.authSubject.subscribe(authObs => {
  
      authObs.subscribe(() => {

        this.isLoading = false;
        this.router.navigate(['/home']);
      }, (errorMessage) => {

        this.error = errorMessage
        this.isLoading = false;
      })

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

  onShowSignup() {
    this.error = null;
    this.showRegister = true;
  }

  onCancelSignUp() {
    this.error = null;
    this.showRegister = false;
  }

  onLogin() {
    this.error = null;

    const { email, password } = this.loginSubmission.value;
    this.isLoading = true;
    this.authSubject.next( this.authService.login(email, password) );
  
  }

  onSignup() {
    this.error = null;

    if(!this.registerSubmission.valid) {
      return;
    }

    const registerBody = { ...this.registerSubmission.value };
    delete registerBody['repeatPassword'];

    this.isLoading = true;
    
    this.authSubject.next( this.authService.signup(registerBody) );
   
    this.registerSubmission.reset();
  }

}
