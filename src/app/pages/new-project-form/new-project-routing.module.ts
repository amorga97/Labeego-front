import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectFormComponent } from './new-project.component';

const routes: Routes = [{ path: '', component: NewProjectFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewProjectRoutingModule {}
