import { Component, OnInit, Input } from '@angular/core';
import { Organo } from 'src/app/interfaces/vote.interfaces';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-organo',
  templateUrl: './organo.component.html',
  styleUrls: ['./organo.component.css'],
  providers:[VoteService]
})
export class OrganoComponent implements OnInit {

  @Input() organo: Organo; 
  seatNames: string[];

  constructor(
    private voteService: VoteService
  ) { }

  ngOnInit() {

    this.seatNames = Object.keys(this.organo.planchas[0]);
    const _idIndex = this.seatNames.indexOf('_id');

    if (_idIndex > -1) {
      this.seatNames.splice(_idIndex, 1);
    }

  }

  onChange(organo: any, index: any, puesto: any, id: any) {
    const organoString = this.bodyNameSet(organo.name);
    this.voteService.onChange(organoString, index, puesto, id);
  }

  bodyNameSet(organo: string) {
    const organoString = organo.replace(/\s+/g, '');
    const modifiedString = organoString[0].toLowerCase() + organoString.slice(1);
    return modifiedString;
  }

  isSelected(organo: any, puesto: string, id: string) {
    const voto = this.voteService.vote;
    const organoString = this.bodyNameSet(organo.name);
    if (voto[organoString][puesto] === id) {
      return true;
    }

    return false;
  }

  onSelectPlate(event: MouseEvent, index: any) {
    const element = event.target as HTMLElement;
    const { checked } = (<HTMLInputElement>element);
    const plancha = this.organo.planchas[index];
    const organoString = this.bodyNameSet(this.organo.name);

    if(checked) {
      this.voteService.onPlateSelected(plancha, organoString);
    } else {
      this.voteService.onPlateSelected();
    }
  
  }

}
