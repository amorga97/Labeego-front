import { Component, Input, OnInit } from '@angular/core';
import { ifProject } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  @Input() projects!: ifProject[];
  constructor() {}
}
