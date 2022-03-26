import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ifProject, ifTask, UserStore } from 'src/app/interfaces/interfaces';
import { ProjectsService } from 'src/app/services/projects.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
  projectForm!: FormGroup;
  alertIsError: boolean = false;
  alertIsActive: boolean = false;
  alertMessage!: string;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public projects: ProjectsService,
    public store: Store<{ user: UserStore }>,
    public localStorage: LocalStorageService,
    public task: TasksService,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(300),
        ],
      ],
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
        .subscribe(() => {
          console.log('hola');
        });
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

  handleDelete() {
    this.projects.remove(this.userData.token, this.project._id).subscribe({
      next: () => {
        this.alertIsActive = true;
        this.alertMessage = 'Has eliminado este proyecto';
        setTimeout(() => {
          this.alertIsActive = false;
          this.alertIsError = false;
          this.router.navigate(['user-dash']);
        }, 1500);
      },
      error: () => {
        this.alertIsActive = true;
        this.alertIsError = true;
        this.alertMessage = 'Ha ocurrido un problema eliminando tu proyecto';
        setTimeout(() => {
          this.alertIsActive = false;
          this.alertIsError = false;
        }, 2000);
      },
    });
  }

  handleSubmit() {
    this.projects
      .update(this.userData.token, this.project._id, {
        ...this.project,
        ...{ ...this.projectForm.value },
      })
      .subscribe({
        next: () => {
          this.alertIsActive = true;
          this.alertMessage = 'Has actualizado este proyecto';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
          }, 1500);
        },
        error: () => {
          this.alertIsActive = true;
          this.alertIsError = true;
          this.alertMessage =
            'Ha ocurrido un problema actualizando tu proyecto';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
          }, 2000);
        },
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.route);
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
        },
      });
    this.projects
      .getOne(this.localStorage.getDataFromLocalStorage() as string, this.id)
      .subscribe({
        next: (data) => {
          this.project = data;
          this.projectForm.get('title')?.setValue(this.project.title);
          this.projectForm
            .get('description')
            ?.setValue(this.project.description);
          this.toDo = this.project.toDo as ifTask[];
          this.doing = this.project.doing as ifTask[];
          this.toReview = this.project.toReview as ifTask[];
          this.done = this.project.done as ifTask[];
        },
        error: () => {
          this.alertIsActive = true;
          this.alertIsError = true;
          this.alertMessage = 'Ha habido un problema cargando el proyecto';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
            this.alertMessage = '';
            this.router.navigate(['user-dash']);
          }, 2000);
        },
      });
  }
}
