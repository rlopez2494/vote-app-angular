import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
  }
  
}
