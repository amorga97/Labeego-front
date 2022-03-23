import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ifProject, ifTask, UserStore } from 'src/app/interfaces/interfaces';
import { ProjectsService } from 'src/app/services/projects.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  id!: string;
  project!: ifProject;
  userData!: UserStore;
  toDo!: ifTask[];
  doing!: ifTask[];
  toReview!: ifTask[];
  done!: ifTask[];
  constructor(
    private route: ActivatedRoute,
    private projects: ProjectsService,
    private store: Store<{ user: UserStore }>
  ) {}

  drop(event: CdkDragDrop<ifTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        this.userData = data;
      });
    this.projects.getOne(this.userData.token, this.id).subscribe((data) => {
      this.project = data;
      this.toDo = (this.project.tasks as ifTask[]).filter(
        (item) => item.status === 'to-do'
      );
      this.doing = (this.project.tasks as ifTask[]).filter(
        (item) => item.status === 'doing'
      );
      this.toReview = (this.project.tasks as ifTask[]).filter(
        (item) => item.status === 'to-review'
      );
      this.done = (this.project.tasks as ifTask[]).filter(
        (item) => item.status === 'done'
      );
    });
  }
}
