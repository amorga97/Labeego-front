import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ifProject, UserStore } from 'src/app/interfaces/interfaces';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-user-dashboard',
  template: ` <h2 class="dashboard-title">Hola, {{ userData.name }}</h2>
    <div class="project-cards-wrapper">
      <h3 class="dashboard-subtitle">Proyectos en curso</h3>
      <div class="project-cards-list">
        <app-new-project></app-new-project>
        <app-project-card
          *ngFor="let item of projectsWithNoAppointment"
          class="project list"
          [hasAppointment]="false"
          [project]="item"
        ></app-project-card>
      </div>
      <h3 class="dashboard-subtitle">Esperando aprobación</h3>
      <div class="project-cards-list">
        <app-project-card
          *ngFor="let item of projectsWithAppointment"
          class="project list"
          [hasAppointment]="true"
          [project]="item"
        ></app-project-card>
      </div>
    </div>`,
  styleUrls: ['./user-dashboard.component.scss'],
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
