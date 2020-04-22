import { 
  Component, 
  OnInit, 
  EventEmitter, 
  Output, 
  Input 
} from '@angular/core';
import { Plate } from 'src/app/models/plate.model';
import { PlateService } from '../plate.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plate-details',
  templateUrl: './plate-details.component.html',
  styleUrls: ['./plate-details.component.css']
})
export class PlateDetailsComponent implements OnInit {

  constructor(
    private plateService: PlateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

      console.log(this.bodyNames);

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
