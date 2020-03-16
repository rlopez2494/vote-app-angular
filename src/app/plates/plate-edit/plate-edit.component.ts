import { Component, OnInit } from '@angular/core';
import { Plate } from 'src/app/models/plate.model';
import { PlateService } from './plate.service';

@Component({
  selector: 'app-plate-edit',
  templateUrl: './plate-edit.component.html',
  styleUrls: ['./plate-edit.component.css'],
  providers: [PlateService]
})

export class PlateEditComponent implements OnInit {

  constructor(private plateService: PlateService) { }

  hidden: boolean = true;

  plate: Plate = this.plateService.plate;

  plateContent: string[] = Object.keys(this.plate);

  ngOnInit() {
  }

  onSubmitPlate() {
    console.log(this.plateService.plate);
  }
}
