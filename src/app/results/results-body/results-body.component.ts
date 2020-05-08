import { Component, Input } from "@angular/core";

export interface VoteResultBody {
    president: {},
    vicepresident: {},
    treasurer?: {},
    generalSecretary: {}
}

@Component({
    selector: 'app-results-body',
    templateUrl: './results-body.component.html',
    styleUrls: ['./results-body.component.css']
})

export class ResultsBodyComponent {
    @Input() bodyName: string;
    @Input() plateBody: VoteResultBody

    get bodyProperties() {
        return Object.keys(this.plateBody);
      }
}