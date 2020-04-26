import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  showLogout: boolean;
  
  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const path = val.url;
    
        if (path === '/') this.showLogout = false;
        else this.showLogout = true;
        
      }
    })

  }

  onLogout() {
    this.authService.logout()
      .subscribe(() => {}, 
        (error) => {
          alert(error)
          this.router.navigate([''])
          localStorage.removeItem('userData');
        })
  }

}
