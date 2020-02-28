import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector:'app-view-option',
    templateUrl:'./view-option.component.html',
    styleUrls:['./view-option.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class ViewOption {
    @Input() headingText: string;
    @Input() imgSrc: string;
}