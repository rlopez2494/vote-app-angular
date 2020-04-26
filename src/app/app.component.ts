import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService) {

  }

  private subscription: Subscription;

  ngOnInit() {
    this.authService.autoLogin();

    this.subscription = this.router.events
      .subscribe((val) => {

      if (val instanceof NavigationEnd) {

        const path = val.url;

        if ((path === '/') || (path === '/admin')) {
          this.renderer.addClass(document.body, 'background--1');
        }

      }
      
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    const path = window.location.pathname;

    if ((path === '/') || (path === '/admin')) {
      this.renderer.removeClass(document.body, 'background--1');
    }

  }
  
}
