import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { JuntaDirectiva, TribunalDisciplinario } from '../../../models/plate.model';
import { PlateService } from '../plate.service';
import { HttpClient } from '@angular/common/http';
import { ListErrorHandling, ListHandling } from '../interfaces/interfaces'

@Component({
  selector: 'app-plate-edit-body',
  templateUrl: './plate-edit-body.component.html',
  styleUrls: ['./plate-edit-body.component.css']
})
export class PlateEditBodyComponent implements OnInit, AfterViewInit {

  constructor(
    private plateService: PlateService,
    private http: HttpClient
  ) {}

  @Input() plateBody: JuntaDirectiva | TribunalDisciplinario;
  @Input() bodyName: string;

  users: any[] = [];
  body: JuntaDirectiva | TribunalDisciplinario;

  listToShow: string;
  loading: boolean = false;  

  // Error handling (autocomplete list)
  listErrorHandling: ListErrorHandling = {
    message: "",
    hide: false
  }
  
  validElements: string[] = ['P', 'LI']

  hasOwnProperty(seat: string) {
    return (this.plateBody.hasOwnProperty(seat));
  }

  ngOnInit() { 
    this.body = { ...this.plateBody } 
  }

  ngAfterViewInit() {
    document.addEventListener('click', (event) => {

      const element = event.target as HTMLElement;
      const { tagName, name, value } = (<HTMLInputElement>element);
      if (tagName !== 'P' && tagName !== 'LI') {
        if(tagName === 'INPUT') {
          if((<HTMLInputElement>element).type !== 'text') { 
            console.log((<HTMLInputElement>element).name)
            console.log('hey')
            this.listToShow = (<HTMLInputElement>element).name;
          } 
        } else {
          this.listToShow = null;
        }
      }

      console.log(tagName !== 'P' && tagName !== 'LI')
      console.log(tagName, (<HTMLInputElement>element).type);
    }) 
  }

  handleChange(seatName: string, id: string) {
    this.listToShow = null;
    const user = this.users.find(user => (user._id === id))
    this.plateService.onEditPlate(this.bodyName, seatName, id);
    this.body[seatName] = `${user.nombre} (${user.CIV})`
  }

  searchUsers = async(event: any) => {

    this.listErrorHandling.hide = true;
    const element = event.target as HTMLElement;

        this.users = [];
        if(event.target.value.length > 0) {
          if (!(this.users.length > 0)) this.loading = true;
          const value = Number(event.target.value);
          if (!(value === NaN)) {
            const urlString = `http://localhost:9000/users/list/${value}`;
            const subscription = this.http.get(urlString);

            subscription.subscribe((responseData: any) => {
              if(responseData.length > 0) {
                
                this.listToShow = (<HTMLInputElement>element).name; 
                
                this.users = responseData;
                this.loading = false;
                
              }
            }, (err) => {
              this.listToShow = (<HTMLInputElement>element).name;

              switch(err.status) {
                case 404:
                  this.loading = false;
                  this.listErrorHandling.hide = false;
                  this.listErrorHandling.message = "No se encuentra registrado";
                  break;
              }

            });
          }
        } else {
          this.listToShow = null;
        }
        
  }

}
