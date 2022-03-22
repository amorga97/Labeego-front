import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ifProject, UserStore } from 'src/app/interfaces/interfaces';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-user-dashboard',
  template: ` <h2 class="dashboard-title">Hola, {{ userData.name }}</h2>
    <h3 class="dashboard-subtitle">Aquí tienes tus proyectos actuales</h3>
    <div *ngFor="let item of projectsWithAppointment" class="project list">
      <app-project-card
        [hasAppointment]="true"
        [project]="item"
      ></app-project-card>
    </div>
    <div *ngFor="let item of projectsWithNoAppointment" class="project list">
      <app-project-card
        [hasAppointment]="false"
        [project]="item"
      ></app-project-card>
    </div>`,
  styles: [],
})
export class UserDashboardComponent implements OnInit {
  userData!: UserStore;
  projectsWithAppointment!: ifProject[];
  projectsWithNoAppointment!: ifProject[];
  constructor(
    private store: Store<{ user: UserStore }>,
    private projectsServ: ProjectsService
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        this.userData = data;
      });

    this.projectsServ.getAllProjects(this.userData.token).subscribe((data) => {
      this.projectsWithAppointment = data.filter(
        (item) => item.appointment && item
      );
      this.projectsWithNoAppointment = data.filter(
        (item) => !item.appointment && item
      );
    });
  }
}
