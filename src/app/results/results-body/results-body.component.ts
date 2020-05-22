import { Component, Input } from "@angular/core";

export interface VoteResultBody {
    president: {
        user: {
            name: string,
            lastName: string
        },
        votos: {},
    },
    vicepresident: {
        user: {},
        votos: {},
    },
    treasurer?: {
        user: {},
        votos: {},
    },
    generalSecretary: {
        user: {},
        votos: {},
    }
}

@Component({
    selector: 'app-results-body',
    templateUrl: './results-body.component.html',
    styleUrls: ['./results-body.component.css']
})

export class ResultsBodyComponent {
    @Input() bodyName: string;
    @Input() plateBody: any;

    get bodyProperties() {
        console.log(this.plateBody);
        return Object.keys(this.plateBody);
      }
}