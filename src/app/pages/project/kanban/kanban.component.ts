import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ifProject, ifTask, UserStore } from 'src/app/interfaces/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
  @Input() project!: ifProject;
  @Input() toDo!: ifTask[];
  @Input() doing!: ifTask[];
  @Input() toReview!: ifTask[];
  @Input() done!: ifTask[];
  @Input() userData!: UserStore;
  newTaskForm!: FormGroup;
  constructor(
    public task: TasksService,
    public projects: ProjectsService,
    public localStorage: LocalStorageService,
    public fb: FormBuilder
  ) {
    this.newTaskForm = fb.group({
      newToDo: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      newDoing: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      newToReview: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      newDone: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  toggleNewTask(id: string) {
    document.getElementById(id)?.classList.toggle('tasks__item--hidden');
    (document.getElementById(id)?.children[0] as HTMLFormElement).focus();
  }

  createNewTask(task: string, status: string) {
    const taskToAdd = { title: task, status: '' };
    switch (status) {
      case 'newToDo':
        taskToAdd.status = 'to-do';
        break;
      case 'newDoing':
        taskToAdd.status = 'doing';
        break;
      case 'newToReview':
        taskToAdd.status = 'to-review';
        break;
      case 'newDone':
        taskToAdd.status = 'done';
        break;
    }
    this.newTaskForm.get(status)?.setValue('');
    this.task
      .create(
        this.project._id,
        this.localStorage.getDataFromLocalStorage() as string,
        taskToAdd
      )
      .subscribe({
        next: (data) => {
          switch (data.status) {
            case 'to-do':
              this.toDo.unshift(data);
              break;
            case 'doing':
              this.doing.unshift(data);
              break;
            case 'to-review':
              this.toReview.unshift(data);
              break;
            case 'done':
              this.done.unshift(data);
              break;
          }
          this.toggleNewTask(status);
        },
        error: (err) => {},
      });
  }

  removeTask(taskId: string) {
    this.task
      .remove(
        this.project._id,
        this.localStorage.getDataFromLocalStorage() as string,
        taskId
      )
      .subscribe({
        next: (data) => {
          switch (data.status) {
            case 'to-do':
              this.toDo = this.toDo.filter((item) => item._id !== data._id);
              break;
            case 'doing':
              this.doing = this.doing.filter((item) => item._id !== data._id);
              break;
            case 'to-review':
              this.toReview = this.toReview.filter(
                (item) => item._id !== data._id
              );
              break;
            case 'done':
              this.done = this.done.filter((item) => item._id !== data._id);
              break;
          }
        },
        error: (err) => {},
      });
  }

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
        .subscribe(() => {});
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
}
