// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

// Directives
import { RemoveWrapper } from './directives/remove-wrapper.directive';
import { AutoComplete } from './directives/autocomplete.directive';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        RemoveWrapper,
        AutoComplete
    ],
    imports: [CommonModule],
    exports: [
        LoadingSpinnerComponent,
        RemoveWrapper,
        AutoComplete
    ]
})

export class SharedModule {}