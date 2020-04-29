import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[complete-list]'
})

export class AutoComplete {

    constructor(private el: ElementRef) {
        const element = el.nativeElement;
    }
}