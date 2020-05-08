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
  showAddPlates: boolean = false;
  showVote: boolean = false;
  
  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const path = val.url;
       
        if (path === '/') {
          this.showLogout = false;
          this.showAddPlates = false;
          this.showVote = false;
        }

        if(path !== '/') this.showLogout = true;

        if (path !== '/' && path !== '/plates' && path !== '/plates/plateEdit') {
          this.showAddPlates = true;
          this.showVote = false;
        }

        if (path !== '/' && (path === '/plates' || path === '/plates/plateEdit')) {
          this.showVote = true;
          this.showAddPlates = false;
        }
        
      }
    })

  }

  onLogout() {
    this.authService.logout()
      .subscribe(() => {
        alert('Logged out successfully');
      }, 
        (error) => {
          alert(error)
          this.router.navigate([''])
          localStorage.removeItem('userData');
        })
  }

}
