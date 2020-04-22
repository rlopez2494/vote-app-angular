// Angular imports
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

// Body interface (reference in the vote.interface.ts file)
import { Body } from 'src/app/interfaces/vote.interfaces';
import { Plate } from 'src/app/models/plate.model';

@Component({
  selector: 'app-organo',
  templateUrl: './organo.component.html',
  styleUrls: ['./organo.component.css'],
})

export class OrganoComponent implements OnInit, OnDestroy {

  @Input() body: Body; 
  @Input() bodyName: string;
  seatNames: string[];
  form: FormGroup;
  formSubscription: Subscription;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    // Definition of form group reveived from parent component
    this.form = (<FormGroup>this.controlContainer.control);

    // Taking the reference of the number of seats in the body
    this.seatNames = Object.keys(this.body.plates[0]);

    // Cutting out the _id property to iterate between seatNames
    // seatNames is used as a *ngFor inside the html template
    const _idIndex = this.seatNames.indexOf('_id');
    if (_idIndex > -1) {
      this.seatNames.splice(_idIndex, 1);
    }

    // Form group value changes event to select/unselect all the plates
    // Object destructuring for the plate selected and the form value related
    // to the vote

    this.formSubscription = this.form.valueChanges
      .subscribe(({plateSelected, ...formValue}) => {
        
        // Variable to check if all the plate was selected
        let plateToSelect: number;

        // Compare if all the candidates of one plate were selected
        (<[]>this.body.plates).forEach((plate: Plate, index) => {

          // Check if a whole plate was selected 
          const plateIsSelected = Object.keys(formValue)
            .every((seat) => (formValue[seat] == plate[seat]._id));
          
          // Asigning the plate index to the variable plateToSelect
          // if a whole plate was selected
          if(plateIsSelected) {
            plateToSelect = index;
          }
        });

        // If there is a match in a whole plate selected and
        // the match is different of the plateSelected property in the form
        // enable the "Select All" radio input on the body
        if(plateToSelect !== undefined && (plateSelected !== plateToSelect)) {
          this.form.patchValue({'plateSelected': plateToSelect});
        }

        // If there is no match in a whole plate selected and
        // there was a "Select All" radio input enabled previously
        // then disable it
        if(plateToSelect === undefined && (plateSelected !== null)) {
          this.form.patchValue({'plateSelected': null});
        }
       
    })

  }

  ngOnDestroy() {
    //Unsubscription from Form group value changes
    this.formSubscription.unsubscribe(); 
  }

  onSelectPlate(index: number) {
    // Take the selected plate and take out the id property
    const plateSelected = this.body.plates[index];
    delete plateSelected['_id'];

    // Setting out patchValue Object
    const patchValuePlate = {};
    Object.keys(plateSelected).forEach(seat => {
      patchValuePlate[seat] = plateSelected[seat]._id;
    })

    // Applying patchValue object
    this.form.patchValue({...patchValuePlate});
  }

}
