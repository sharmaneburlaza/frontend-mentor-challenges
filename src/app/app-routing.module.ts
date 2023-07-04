import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiStepFormComponent } from './multi-step-form/multi-step-form.component';

const routes: Routes = [
  {path: 'multi-step-form', component: MultiStepFormComponent},
  { path: '', redirectTo: 'multi-step-form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
