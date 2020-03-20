import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { Plate, JuntaDirectiva, TribunalDisciplinario } from 'src/app/models/plate.model';

@Component({
  selector: 'app-plate-details',
  templateUrl: './plate-details.component.html',
  styleUrls: ['./plate-details.component.css']
})
export class PlateDetailsComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Output() close: EventEmitter<any> = new EventEmitter()
  @Input('plate') plateInput: Plate;
  bodyNames: string[];

  ngOnInit() {
    if (Object.keys(this.plateInput).length > 0) {

      const { 
        juntaDirectiva, 
        tribunalDisciplinario, 
        juntaDirectivaDeCentro 
      } = this.plateInput;

      const bodies = {
        juntaDirectiva,
        tribunalDisciplinario, 
        juntaDirectivaDeCentro
      }

      this.bodyNames = Object.keys(bodies);

      console.log(this.bodyNames);
      
    }
  }

  getSeats(bodyName: string) {
    return Object.keys(this.plateInput[bodyName]);
  }

  ngAfterViewInit() {
    
  }

  locationUrl: string = window.location.pathname;

  onCloseDetails() {
    this.close.emit();
  }

}
