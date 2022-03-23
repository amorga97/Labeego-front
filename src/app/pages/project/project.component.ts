import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ifProject, UserStore } from 'src/app/interfaces/interfaces';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  id!: string;
  project!: ifProject;
  userData!: UserStore;
  constructor(
    private route: ActivatedRoute,
    private projects: ProjectsService,
    private store: Store<{ user: UserStore }>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        this.userData = data;
      });
    this.projects.getOne(this.userData.token, this.id).subscribe((data) => {
      this.project = data;
      console.log(data);
    });
  }
}
