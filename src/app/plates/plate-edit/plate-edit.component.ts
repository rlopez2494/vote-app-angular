import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlateService } from '../plate.service';
import { Plate } from 'src/app/models/plate.model';
import { CanDeactivateGuard } from 'src/app/can-deactivate-guard';

@Component({
  selector: 'app-plate-edit',
  templateUrl: './plate-edit.component.html',
  styleUrls: ['./plate-edit.component.css']
})

export class PlateEditComponent implements OnInit, CanDeactivateGuard{ 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private plateService: PlateService) { }
  
  plateSubmission: FormGroup;

  confirmPlate: Plate = this.plateService.submissionModal;

  hidden: boolean = true;

  showDetails: boolean = false;

  subscription: Subscription;

  users: [];

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.plateSubmission.valid) {
      return confirm('Are you sure you want to discard the plate submission')
    } else {
      return true;
    }
  }

  ngOnInit() {


    this.plateSubmission = new FormGroup({
      'directiveBoard': new FormGroup({
        'president': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'vicepresident': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'treasurer': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'generalSecretary': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this))
      }),

      'districtDirectiveBoard': new FormGroup({
        'president': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'vicepresident': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'treasurer': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'generalSecretary': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this))
      }),

      'disciplinaryCourt': new FormGroup({
        'president': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'vicepresident': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this)),

        'generalSecretary': new FormControl(
          null, 
          [Validators.required], 
          this.isValidUser.bind(this))

      })
    });

    
  }

  isValidUser(control: FormControl) : Promise<{[s: string]: boolean} | null> {
    return this.plateService.validateUser(control);
  }

  onCancelSubmit() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  getSeats(body: string) {
    return Object.keys(this.plateSubmission.value[body]);
  }

  getShowcaseSeats() {
    return Object.keys(this.confirmPlate);
  }

  closeDetails() {
    this.showDetails = false;
  }

  onSubmitPlate() {
    console.log(this.plateSubmission);
    this.showDetails = true;
  }

  submitPlate() {

    const urlString = `http://localhost:9000/plates`
        const body = {
            ...this.plateSubmission.value,
            number: 4
        }

        this.http.post(urlString, body)
            .subscribe((responseData) => {
                console.log(responseData)
                alert('THE PLATE HAS BEEN SAVED SUCCESFULLY');
                this.plateSubmission.reset();
                this.router.navigate(['..'], {relativeTo: this.route});
            }, (err) => {
                console.log(err);
            })

  }

}
