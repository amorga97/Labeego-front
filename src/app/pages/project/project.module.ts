import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectModule {}