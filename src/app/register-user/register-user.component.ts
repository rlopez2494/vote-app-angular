/*  El siguiente componente fue realizado a fin de presentacion
debido a que los usuarios de prueba ya estan almacenados en la
base de datos, no se realizo una interaccion para guardar usuarios
por medio de este componente  */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CIVUser } from '../models/civ-user.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  civSearch: string;
  cedula: number;
  name: string;
  lastName: string;
  voteLocation: string;
  solvent: boolean = false;
  publicKey: string;
  msgState: string = 'init';
  loading: boolean = false;
  locationMsg: string = 'CIV - Monagas\n#231\nAv. Paseo Aerobico\ntransversal 7.'
      

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmitSearch() {

    if( ( this.civSearch ) && ( this.civSearch.length > 0 ) ) {

      const searchToNumber = parseInt(this.civSearch)
     
      if(Number.isInteger(searchToNumber)) {

        this.cedula = undefined;
        this.name = undefined;
        this.lastName = undefined;
        this.solvent = undefined;
        this.publicKey = undefined;
        this.msgState = 'searching'
        this.loading = true;


        const subscription = this.http.get('http://localhost:9000/civ-users/' + this.civSearch)
          .subscribe(( responseData: CIVUser ) => {

            setTimeout(() => {
              if (responseData) {
                const { cedula, nombre, apellido, solvente } = responseData;
                this.cedula = cedula;
                this.name = nombre;
                this.lastName = apellido;
                this.solvent = solvente;
                this.msgState = 'wait fingerprint';
              }
              this.loading = false;
            }, 3000)

            setTimeout(() => {
              setTimeout(() => {
                this.publicKey = '81dc9bdb52d04dc20036dbd8313ed055';
                this.msgState = 'success'
              }, 5000);
            }, 5000);

          }, error => {

            if(error.status === 404) {
              this.msgState = 'not found';
              this.loading = false;
            }

            if(error.status === 0) {
              this.msgState = 'server not found';
              this.loading = false;
            }

            if(error.status === 400) {
              this.msgState = 'server not found';
              this.loading = false;
            }

            console.log(error.status);
          },
          () => {
            console.log('hey completion heereee maaaaan')
          });

          setTimeout(() => {

            if(this.msgState === 'searching') {
              subscription.unsubscribe();
              this.loading = false;
              this.msgState = 'external error'
            }

          }, 15000)

      } else {
        this.msgState = 'only numbers'
      }

    } else {
      this.msgState = 'empty search'
    }

    



    
  }

  onConfirmSubmit() {
    const confirmarRegistro = confirm("Desea registrar el siguiente usuario?");
    if(confirmarRegistro) { this.msgState = 'saved' }
  }

  onConfirmCancel() {
    const confirmCancel = confirm('Desea cancelar el registro?');
    if(confirmCancel) {
      this.cedula = undefined;
      this.name = undefined;
      this.lastName = undefined;
      this.solvent = undefined;
      this.publicKey = undefined;
      this.msgState = 'init';
    }
  }

}
