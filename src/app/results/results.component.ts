import { Component, OnInit } from "@angular/core";
import { VoteService } from '../vote/vote.service';

export interface VoteResult {
    directiveBoard: {},
    districtDirectiveBoard: {},
    disciplinaryCourt: {}
}

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
    constructor(private voteService: VoteService) {}

    voteResults: VoteResult;
    errorMessage: string = null;
    isLoading: boolean = true;

    ngOnInit() {
        this.voteService.voteResults()
            .subscribe((data: VoteResult) => {
                this.voteResults = { ...data };
                this.isLoading = false;
                           
            }, (error) => {
                this.isLoading = false;
          
                switch (error) {
                    case 'VOTE_NOT_FOUND':
                        this.errorMessage = 'There are no votes registered yet in this account, you need to make at least one vote to see the results'
                        break;
                
                    default:
                        break;
                }    
            })
    }
}