import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewProjectRoutingModule } from './new-project-routing.module';
import { NewProjectFormComponent } from './new-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewProjectFormComponent],
  imports: [
    CommonModule,
    NewProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewProjectModule {}
