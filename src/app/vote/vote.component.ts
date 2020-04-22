import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { bodyNameSet } from '../utilities/bodyNameSet';
import { PlateService } from '../plates/plate.service';
import { VoteService } from './vote.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(
    private plateService: PlateService,
    private voteService: VoteService,
    private router: Router,
    private route: ActivatedRoute
    ) { }
 
  data: Object[];
  bodies: Object[];
  voteSubmission: FormGroup;
  voteDate: Date = new Date();

  ngOnInit() {

    this.voteSubmission = new FormGroup({
      'directiveBoard': new FormGroup({
        'president': new FormControl(null),
        'vicepresident': new FormControl(null),
        'treasurer': new FormControl(null),
        'generalSecretary': new FormControl(null),
        'plateSelected': new FormControl(null)
      }),
      'districtDirectiveBoard': new FormGroup({
        'president': new FormControl(null),
        'vicepresident': new FormControl(null),
        'treasurer': new FormControl(null),
        'generalSecretary': new FormControl(null),
        'plateSelected': new FormControl(null)
      }),
      'disciplinaryCourt': new FormGroup({
        'president': new FormControl(null),
        'vicepresident': new FormControl(null),
        'generalSecretary': new FormControl(null),
        'plateSelected': new FormControl(null)
      }),
      'registerDate': new FormControl(null, [Validators.required])
    });

    this.plateService.getPlates()
      .subscribe((responseData: any) => {
          
          // Response data taken first in case of debugging
          this.data = responseData;
          
          // Making of the vote plates
          this.bodies = this.getBodies(this.data);
          
      }, (err) => {
        console.log(err);
      })

  }

  setBodyName(bodyName: string) {
    return bodyNameSet(bodyName)
  }

  getBodies(data: any) {
    // Tribunales disciplinarios postuladas
    let Dc = {
        name: "Disciplinary Court",
        plates: []
    }

    // Juntas Directivas Nacionales postuladas
    let Db= {
        name: "Directive Board",
        plates: []
    }

    // Juntas Directivas de Centro
    let Ddb = {
        name: "District Directive Board",
        plates: []
    }

    data.forEach( (plate: any) => {

        if (plate.disciplinaryCourt && (Dc.plates.length < 3)) {
            Dc.plates.push(plate.disciplinaryCourt);
        }

        if(plate.directiveBoard && (Db.plates.length < 3)) {
            Db.plates.push(plate.directiveBoard);
        }

        if(plate.districtDirectiveBoard && (Ddb.plates.length < 3)) {
            Ddb.plates.push(plate.districtDirectiveBoard);
        }
    });

    const bodies = [Dc, Db, Ddb];
    

    return bodies;

  }

  onVoteSubmit() {
    const proceed = confirm('The vote is irreversible after making it, do you want to proceed?');

    if (proceed) {
      this.voteSubmission.patchValue({
        'registerDate': this.voteDate.toISOString()
      });
  
      const voteObject = { ...this.voteSubmission.value };
  
      for (const property in this.voteSubmission.value) {
        if(property !== 'registerDate')
        delete voteObject[property]['plateSelected'];
      }
  
      this.voteService.submitVote(voteObject)
        .subscribe(responseData => {
          console.log(responseData)
          alert('The vote was made successfully');
          this.router.navigate(['..'], { relativeTo: this.route });
        }, (error) => {
          console.log(error);
        });
    }

  }

  clearVote() {
    const check = confirm('Are you sure you want to restart the vote fields?')
    if (check) this.voteSubmission.reset();
  }


}
