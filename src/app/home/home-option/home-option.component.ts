import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector:'app-home-option',
    templateUrl:'./home-option.component.html',
    styleUrls:['./home-option.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class HomeOptionComponent {

    constructor(private router: Router) {}

    @Input() headingText: string;
    @Input() imgSrc: string;
    @Input () linkTo: string[];

    onNavigate() {
        this.router.navigate(this.linkTo);
    }
}