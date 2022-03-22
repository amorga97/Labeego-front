import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ifProject, UserStore } from 'src/app/interfaces/interfaces';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-user-dashboard',
  template: ` <h1>Hola, {{ userData.name }}</h1>
    <div *ngFor="let item of projects">
      <app-project-card [project]="item"></app-project-card>
    </div>`,
  styles: [],
})
export class UserDashboardComponent implements OnInit {
  userData!: UserStore;
  projects!: ifProject[];
  constructor(
    private store: Store<{ user: UserStore }>,
    private projectsServ: ProjectsService
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        console.log(data);
        this.userData = data;
      });

    this.projectsServ.getAllProjects(this.userData.token).subscribe((data) => {
      console.log(data);
      this.projects = data;
    });
  }
}
