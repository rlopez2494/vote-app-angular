import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, route: ActivatedRoute) { }

  urlString: String;
  urlName: String;
  
  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const path = val.url;
    
        if (path === '/') {
          this.urlString = '/admin';
          this.urlName = 'ADMIN' 
        } else if (path === '/admin') {
          this.urlString = '/'
          this.urlName = 'USER'
        } else {
          this.urlString = '/',
          this.urlName = 'LOG OUT'
        }
      }
    })

  }

}
