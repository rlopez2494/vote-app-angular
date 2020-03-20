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

  signalToCheck: Object = {
    presidente: null,
    vicepresidente: null,
    tesorero: null,
    secretarioGeneral: null
  };

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
    document.addEventListener('mouseup', (event) => {

      const element = event.target as HTMLElement;
      const { tagName, name, type } = (<HTMLInputElement>element);

      if (tagName !== 'P' && tagName !== 'LI') {
        if(tagName === 'INPUT') {
          if(type !== 'text') { 
            this.listToShow = name;
          } 
        } else {
          this.listToShow = null;
        }
      }

    }); 

  }

  handleChange(seatName: string, id: string) {
    this.listToShow = null;
    const user = this.users.find(user => (user._id === id))
    this.plateService.onEditPlate(this.bodyName, seatName, id, user);
    this.body[seatName] = `${user.nombre} (${user.CIV})`
    this.signalToCheck[seatName] = 'success';
  }

  searchUsers(event: any) {

    this.listErrorHandling.hide = true;

    const element = event.target as HTMLElement;
    const { name } = (<HTMLInputElement>element);

    this.signalToCheck[name] = 'waiting'

        this.users = [];
        if(event.target.value.length > 0) {
          if (!(this.users.length > 0)) this.loading = true;
          const value = Number(event.target.value);
          if (!(value === NaN)) {
            const urlString = `http://localhost:9000/users/list/${value}`;
            const subscription = this.http.get(urlString);

            subscription.subscribe((responseData: any) => {
              if(responseData.length > 0) {
                
                this.users = responseData.filter((user: any) => {
                  let validUser = true;

                  // Filtrar los usuarios que ya han sido seleccionados
                  Object.keys(this.plateService.plate).forEach(body => {
                    Object.keys(this.plateService.plate[body]).forEach(seat => {
                      if (user._id === this.plateService.plate[body][seat]) {
                        validUser = false;
                      }
                    });
                  });

                  return validUser;
                });

                this.loading = false;
                this.listToShow = name;
                
                
              }
            }, (err) => {
              console.log(err);
              console.log(err.status);
              this.listToShow = name;

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
          this.signalToCheck[name] = null;
        }
        
  }

}
