// Angular imports
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

// Debounce from underscore js
import { debounce } from 'underscore';

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

  scrollAmmout: number;

  @ViewChild('bodyPlates', { static: true }) bodyPlates: ElementRef;

  constructor(private controlContainer: ControlContainer) { }

  handleTouch() {
    const platesElement = this.bodyPlates.nativeElement;
    
    const leftScroll = platesElement.scrollLeft;

      if(leftScroll < 153) {
        platesElement.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.scrollAmmout = 0;
      }
      if(leftScroll > 153 && leftScroll < 462) {
       
        platesElement.scrollTo({
          top: 0,
          left: 306,
          behavior: 'smooth'
        });
        this.scrollAmmout = 306;
      }
      if(leftScroll > 462) {
        platesElement.scrollTo({
          top: 0,
          left: 609,
          behavior: 'smooth'
        });

        this.scrollAmmout = 609;
      } 
 
  }

  ngOnInit() {
    const platesElement = this.bodyPlates.nativeElement;
    
    platesElement.addEventListener('touchmove', debounce(this.handleTouch.bind(this), 1000));


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
    if(this.formSubscription) {
      this.formSubscription.unsubscribe(); 
    }
  }

  swipe(side: string) {

    const scrollSteps: number = this.body.plates.length;
    const platesElement = this.bodyPlates.nativeElement;
    const leftScroll = platesElement.scrollLeft;
    const { scrollWidth } = platesElement;

    if(side === 'right' && leftScroll < 609) {
      if (this.scrollAmmout === undefined) {
        this.scrollAmmout = leftScroll + (scrollWidth / scrollSteps);
      } else {
        this.scrollAmmout = this.scrollAmmout + (scrollWidth / scrollSteps);
      }

      platesElement.scrollTo({
        top: 0,
        left: this.scrollAmmout,
        behavior: 'smooth'
      });

    } else if(side === 'left' && leftScroll >= 303) {

      this.scrollAmmout = this.scrollAmmout - (scrollWidth / scrollSteps);
      
      platesElement.scrollTo({
        top: 0,
        left: this.scrollAmmout,
        behavior: 'smooth'
      });

    } 
  
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
