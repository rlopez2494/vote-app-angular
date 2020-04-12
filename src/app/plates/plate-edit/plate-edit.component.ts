import { Component, OnInit } from '@angular/core';
import { Plate } from 'src/app/models/plate.model';
import { PlateService } from './plate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-plate-edit',
  templateUrl: './plate-edit.component.html',
  styleUrls: ['./plate-edit.component.css'],
  providers: [PlateService]
})

export class PlateEditComponent implements OnInit {

  constructor(
    private plateService: PlateService,
    private router: Router,
    private route: ActivatedRoute) { }
  
  plateSubmission: FormGroup;

  hidden: boolean = true;

  plate: Plate = this.plateService.plate;

  plateContent: string[] = Object.keys(this.plate);

  plateNames: Plate = this.plateService.plateNames;

  plateNamesBodies: string[] = Object.keys(this.plateNames);

  showDetails: boolean = false;

  ngOnInit() {
    this.plateSubmission = new FormGroup({
      'directiveBoard': new FormGroup({
        'president': new FormControl(null),
        'vicepresident': new FormControl(null),
        'treasurer': new FormControl(null),
        'generalSecretary': new FormControl(null)
      }),
      'municipalityDirectiveBoard': new FormGroup({
        'president': new FormControl(null),
        'vicepresident': new FormControl(null),
        'treasurer': new FormControl(null),
        'generalSecretary': new FormControl(null)
      }),
      'disciplinaryCourt': new FormGroup({
        'president': new FormControl(null),
        'vicepresident': new FormControl(null),
        'generalSecretary': new FormControl(null)
      })
    })
  }

  onCancelSubmit() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  getSeats(body: string) {
    return Object.keys(this.plateNames[body])
  }

  closeDetails() {
    this.showDetails = false;
  }

  onSubmitRequest() {
    this.plateService.onRequestSubmitted();
  }

  onSubmitPlate() {

    if (this.plateService.validateRequest()) {
      this.showDetails = true;
    } else {
      alert(`Hay un error en el registro que intenta realizar, por favor corrijalo para proseguir`)
    }
    
  }
}
