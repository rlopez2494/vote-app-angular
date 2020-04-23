import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DirectiveBoard, DisciplinaryCourt } from '../../../models/plate.model';
import { HttpClient } from '@angular/common/http';
import { ListErrorHandling } from '../interfaces/interfaces';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plate-edit-body',
  templateUrl: './plate-edit-body.component.html',
  styleUrls: ['./plate-edit-body.component.css']
})
export class PlateEditBodyComponent implements OnInit, AfterViewInit {

  constructor(
    private http: HttpClient,
    private controlContainer: ControlContainer
  ) {}

  @Input() plateBody: DirectiveBoard | DisciplinaryCourt;
  @Input() bodyName: string;

  form: FormGroup;
  users: any[] = [];
  subscription: Subscription;

  listToShow: string;

  signalToCheck: Object = {
    president: null,
    vicepresident: null,
    treasurer: null,
    generalSecretary: null
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
    this.form = (<FormGroup>this.controlContainer.control);
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

  handleChange(seatName: string, CIV: Number) {
    this.listToShow = null;
    this.form.patchValue({ [seatName]: CIV });
    this.signalToCheck[seatName] = 'success';
  }

  searchUsers(event: any) {

    this.listErrorHandling.hide = true;

    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    const element = event.target as HTMLElement;
    const { name } = (<HTMLInputElement>element);

    this.signalToCheck[name] = 'waiting';

        this.users = [];

        if(event.target.value.length > 0) {
          if (!(this.users.length > 0)) this.loading = true;
          const value = Number(event.target.value);
          if (!(value === NaN)) {
            const urlString = `http://localhost:9000/civ-users/list/${value}`;
            this.subscription = this.http.get(urlString)
              .subscribe((responseData: any) => {
              if(responseData.length > 0) {
                
                this.users = responseData.filter((user: any) => {
                  let validUser = true;

                  // Get the formGroup object
                  const formValue = this.form['_parent'].value;

                  // Filter already selected users
                  Object.keys(formValue).forEach(body => {
                    Object.keys(formValue[body]).forEach(seat => {
                      if (user['CIV'] === formValue[body][seat]) {
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
              this.listToShow = name;

              if(err.status === 404) {
                this.loading = false;
                this.listErrorHandling.hide = false;
                this.listErrorHandling.message = "No se encuentra registrado";
              }

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
