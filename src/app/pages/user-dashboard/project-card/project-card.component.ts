import { style } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ifProject, ifTask, UserStore } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: ifProject;
  @Input() hasAppointment!: boolean;
  @Input() index!: number;
  lastUpdate!: Object;
  tasks!: ifTask[];
  admin: boolean = false;
  progress!: number;
  userData!: UserStore;
  appointmentDate!: string;
  constructor(
    private store: Store<{ user: UserStore }>,
    public router: Router
  ) {}

  getLastUpdate() {
    if (new Date(this.project.lastUpdate).getDate() === new Date().getDate()) {
      const hoursSinceUpdate =
        new Date().getHours() - new Date(this.project.lastUpdate).getHours();
      hoursSinceUpdate === 0
        ? (this.lastUpdate = 'Hace menos de 1 hora')
        : (this.lastUpdate = `Hace ${hoursSinceUpdate} hora${
            hoursSinceUpdate > 1 ? 's' : ''
          }`);
    } else {
      const daysSinceUpdate =
        new Date().getDate() - new Date(this.project.lastUpdate).getDate();
      this.lastUpdate = `Hace ${daysSinceUpdate} día${
        daysSinceUpdate > 1 ? 's' : ''
      }`;
    }
  }

  getRelevantTasks() {
    this.tasks = [...(this.project.done as ifTask[])].slice(0, 2);
    if (!this.tasks.length) {
      this.tasks = (this.project.toDo as ifTask[]).slice(0, 2);
    }
  }

  getProgress() {
    const totalTasks =
      (this.project.toDo as ifTask[]).length +
      (this.project.doing as ifTask[]).length +
      (this.project.toReview as ifTask[]).length +
      (this.project.done as ifTask[]).length;
    const doneTasks = (this.project.done as ifTask[]).length;
    this.progress = Math.floor((doneTasks / totalTasks) * 100);
    setTimeout(() => {
      const progressBar = document.getElementById(
        this.index.toString() + this.hasAppointment
      );
      progressBar!.style.width = `${this.progress.toString()}%`;
      console.log(progressBar, this.progress);
    }, 100);
  }

  getAppointmentDate() {
    if (this.hasAppointment) {
      this.appointmentDate = new Date(
        this.project.appointment as string
      ).toLocaleDateString();
    }
  }

  handleClick() {
    this.router.navigate([`project/${this.project._id}`]);
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
          this.admin = this.userData.admin;
        },
      });
    this.getProgress();
    this.getLastUpdate();
    this.getRelevantTasks();
    this.getAppointmentDate();
  }
}
