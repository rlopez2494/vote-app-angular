import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PlateService } from './plate.service';

@Component({
  selector: 'app-plates',
  templateUrl: './plates.component.html',
  styleUrls: ['./plates.component.css']
})

export class PlatesComponent implements OnInit {

  constructor(
    private plateService: PlateService,
    private router: Router) { }

  plates: Object[];
  plateDetails: Object;
  showDetails: boolean = false;
  showPlates: boolean = false;

  ngOnInit() {

    this.plateService.getPlates()
      .subscribe((responseData: Object[]) => {
          this.showPlates = true;
          this.plates = responseData;
      }, (error) => {
        alert(error)
        this.router.navigate(['']);
      });

  }

  onSubmitDeletePlate(event: any) {
    const { _id } = event
    this.plateService.deletePlate(_id)
    .subscribe(() => {
      this.showDetails = false;
      this.plateService.getPlates()
        .subscribe((responseData: any) => {
          this.plates = responseData;
        }, (error) => {
          console.log(error);
        })
    }, (error) => {
        console.log(error)
    })
  }

  onDetailsShowed(event: Object) {
    this.plateDetails = { ...event };
    this.showDetails = true;
  }

  onDetailsClosed() {
    this.plateDetails = {};
    this.showDetails = false;
  }

}
