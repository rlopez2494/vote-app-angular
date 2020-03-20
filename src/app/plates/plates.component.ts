import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plates',
  templateUrl: './plates.component.html',
  styleUrls: ['./plates.component.css']
})

export class PlatesComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  plates: Object[];
  plateDetails: Object;
  showDetails: boolean = false;
  showPlates: boolean = false;

  ngOnInit() {

    const urlString = 'http://localhost:9000/plates';
    
    this.http.get(urlString)
      .subscribe((responseData: Object[]) => {
          this.showPlates = true;
          this.plates = responseData;
      }, (err) => {
        console.log(err);
      })
      
  }

  onDetailsShowed(event: Object){
    this.plateDetails = {...event};
    this.showDetails = true;
  }

  onDetailsClosed() {
    this.plateDetails = {};
    this.showDetails = false;
  }

}
