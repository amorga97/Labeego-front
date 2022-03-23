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
import { TasksService } from 'src/app/services/tasks.service';

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
    private store: Store<{ user: UserStore }>,
    private task: TasksService
  ) {}

  drop(event: CdkDragDrop<ifTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.projects
        .update(this.userData.token, this.project._id, {
          ...this.project,
          toDo: [...this.toDo],
          done: [...this.done],
          doing: [...this.doing],
          toReview: [...this.toReview],
        })
        .subscribe();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.projects
        .update(this.userData.token, this.project._id, {
          ...this.project,
          toDo: [...this.toDo],
          done: [...this.done],
          doing: [...this.doing],
          toReview: [...this.toReview],
        })
        .subscribe();

      switch (event.container.id) {
        case 'cdk-drop-list-0':
          this.task
            .changeStatus(
              this.userData.token,
              event.container.data[event.currentIndex]._id,
              this.project._id,
              { ...event.container.data[event.currentIndex], status: 'to-do' }
            )
            .subscribe();
          break;

        case 'cdk-drop-list-1':
          this.task
            .changeStatus(
              this.userData.token,
              event.container.data[event.currentIndex]._id,
              this.project._id,
              { ...event.container.data[event.currentIndex], status: 'doing' }
            )
            .subscribe();
          break;
        case 'cdk-drop-list-2':
          this.task
            .changeStatus(
              this.userData.token,
              event.container.data[event.currentIndex]._id,
              this.project._id,
              {
                ...event.container.data[event.currentIndex],
                status: 'to-review',
              }
            )
            .subscribe();
          break;
        case 'cdk-drop-list-3':
          this.task
            .changeStatus(
              this.userData.token,
              event.container.data[event.currentIndex]._id,
              this.project._id,
              { ...event.container.data[event.currentIndex], status: 'done' }
            )
            .subscribe();
          break;
        default:
          break;
      }
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
      this.toDo = this.project.toDo as ifTask[];
      this.doing = this.project.doing as ifTask[];
      this.toReview = this.project.toReview as ifTask[];
      this.done = this.project.done as ifTask[];
    });
  }
}
