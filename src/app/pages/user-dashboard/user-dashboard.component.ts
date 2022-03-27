import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ifProject, UserStore } from 'src/app/interfaces/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-user-dashboard',
  template: `
    <app-layout>
      <app-alerts
        class="alert"
        [active]="alertIsActive"
        [isError]="alertIsError"
        [message]="alertMessage"
      ></app-alerts>
      <div class="project-cards-wrapper">
        <div className="projects projects--no-appointment">
          <h2 class="projects__title">Proyectos en curso</h2>
          <div class="projects__list-container">
            <app-new-project></app-new-project>
            <app-project-card
              *ngFor="let item of projectsWithNoAppointment; let i = index"
              [index]="i"
              [hasAppointment]="false"
              [project]="item"
            ></app-project-card>
          </div>
        </div>
        <div className="projects projects--no-appointment">
          <h2 class="projects__title">Esperando aprobación</h2>
          <div class="projects__list-container">
            <app-project-card
              *ngFor="let item of projectsWithAppointment; let i = index"
              [index]="i"
              [hasAppointment]="true"
              [project]="item"
            ></app-project-card>
          </div>
        </div>
      </div>
    </app-layout>
  `,
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  userData!: UserStore;
  name: string = '';
  projectsWithAppointment!: ifProject[];
  projectsWithNoAppointment!: ifProject[];
  alertIsError: boolean = false;
  alertIsActive: boolean = false;
  alertMessage!: string;
  constructor(
    public store: Store<{ user: UserStore }>,
    public projectsServ: ProjectsService,
    public localStorage: LocalStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
          this.name = this.userData?.name;
        },
      });

    this.projectsServ
      .getAllProjects(this.localStorage.getDataFromLocalStorage() as string)
      .subscribe({
        next: (data: ifProject[]) => {
          this.projectsWithAppointment = data.filter(
            (item) => item.appointment && item
          );
          this.projectsWithNoAppointment = data.filter(
            (item) => !item.appointment && item
          );
        },
        error: (err) => {
          this.alertIsActive = true;
          this.alertIsError = true;
          this.alertMessage = 'Tu sesión ha expirado, redireccionando...';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = true;
            this.router.navigate(['login']);
          }, 2000);
        },
      });
  }
}
