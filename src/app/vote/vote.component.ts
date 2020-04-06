import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient) { }
 
  data: Object[];
  organos: Object[];

  getBodies(data: any) {
    // Tribunales disciplinarios postuladas
    let Td = {
        name: "Tribunal Disciplinario",
        planchas: []
    }

    // Juntas Directivas Nacionales postuladas
    let Jd= {
        name: "Junta Directiva",
        planchas: []
    }

    // Juntas Directivas de Centro
    let Jdc = {
        name: "Junta Directiva De Centro",
        planchas: []
    }

    
    data.forEach( (plancha: any) => {

        if (plancha.tribunalDisciplinario && (Td.planchas.length < 3)) {
            Td.planchas.push(plancha.tribunalDisciplinario);
        }

        if(plancha.juntaDirectiva && (Jd.planchas.length < 3)) {
            Jd.planchas.push(plancha.juntaDirectiva);
        }

        if(plancha.juntaDirectivaDeCentro && (Jdc.planchas.length < 3)) {
            Jdc.planchas.push(plancha.juntaDirectivaDeCentro);
        }
    });

    const organos = [Jd, Td, Jdc];

    return organos;

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const urlString = 'http://localhost:9000/plates';
    
    this.http.get(urlString)
      .subscribe((responseData: any) => {

          this.data = responseData;
          this.organos = this.getBodies(this.data);

      }, (err) => {
        console.log(err);
      })
  }

}
