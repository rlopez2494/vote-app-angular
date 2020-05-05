import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plate-item',
  templateUrl: './plate-item.component.html',
  styleUrls: ['./plate-item.component.css']
})
export class PlateItemComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  @Input() addPlate: boolean = false;
  @Input() canAdd: boolean;
  @Input() plate: Object;
  @Output() showPlate: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  
  }

  onShowDetails() {
    this.showPlate.emit({ ...this.plate });
  }

  onAddPlate() {
    if (this.canAdd) {
      return this.router.navigate(['plateEdit'], { relativeTo: this.route });
    }

    alert('You cannot add more than 3 plates');
  }

}
