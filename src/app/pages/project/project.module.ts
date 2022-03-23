import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, ProjectRoutingModule, DragDropModule],
})
export class ProjectModule {}
