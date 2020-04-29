import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { VoteComponent } from './vote.component';
import { OrganoComponent } from './organo/organo.component';

// Services
import { AuthGuard } from '../auth-guard.service';

@NgModule({
    declarations: [VoteComponent, OrganoComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', canActivate:[AuthGuard], component: VoteComponent }
    ])]
})

export class VoteModule {}