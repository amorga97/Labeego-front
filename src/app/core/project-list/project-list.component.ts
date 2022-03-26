import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ifProject } from 'src/app/interfaces/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects!: ifProject[];
  projectsWithAppointment!: ifProject[];
  projectsWithoutAppointment!: ifProject[];
  constructor(
    public router: Router,
    public projectsService: ProjectsService,
    public localStorage: LocalStorageService
  ) {}

  handleClick(project: ifProject) {
    this.router.navigate([`project/${project._id}`]);
  }

  ngOnInit(): void {
    console.log(this.projects);

    this.projectsService
      .getAllProjects(this.localStorage.getDataFromLocalStorage() as string)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.projects = data;
          this.projectsWithAppointment = this.projects?.filter(
            (item) => item.appointment && item
          );
          this.projectsWithoutAppointment = this.projects?.filter(
            (item) => !item.appointment && item
          );
        },
        error: () => {},
      });
  }
}
