import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { KanbanComponent } from './kanban/kanban.component';

@NgModule({
  declarations: [ProjectComponent, KanbanComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class ProjectModule {}
