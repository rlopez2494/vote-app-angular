// Core imports
import { 
  Component, 
  OnInit, 
  EventEmitter, 
  Output, 
  Input 
} from '@angular/core';

// Components/plates
import { Plate } from 'src/app/models/plate.model';

@Component({
  selector: 'app-plate-details',
  templateUrl: './plate-details.component.html',
  styleUrls: ['./plate-details.component.css']
})
export class PlateDetailsComponent implements OnInit {

  constructor() { }

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Input('plate') plateInput: Plate;
  bodyNames: string[];
  locationUrl: string;

  ngOnInit() {
    if (Object.keys(this.plateInput).length > 0) {
      const { 
        directiveBoard, 
        districtDirectiveBoard, 
        disciplinaryCourt 
      } = this.plateInput;

      const bodies = {
        directiveBoard,
        districtDirectiveBoard, 
        disciplinaryCourt
      }

      this.bodyNames = Object.keys(bodies);

      this.locationUrl = window.location.pathname;

    }
  }

  getSeats(bodyName: string) {
    return Object.keys(this.plateInput[bodyName]);
  }

  onCloseDetails() {
    this.close.emit();
  }

  onDeletePlate() {
    const { _id } = this.plateInput;
    this.delete.emit({_id})
  }

}
