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
  lastUpdate!: Object;
  tasks!: ifTask[];
  progress!: number;
  userData!: UserStore;
  appointmentDate!: string;
  constructor(
    private store: Store<{ user: UserStore }>,
    private router: Router
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
    this.tasks = (this.project.tasks as ifTask[]).filter(
      (item) => item.status === 'doing'
    );
    const LastDoneTask = (this.project.tasks as ifTask[])
      .reverse()
      .find((item) => item.status === 'done');
    if (LastDoneTask) this.tasks.splice(0, 0, LastDoneTask);
  }

  getProgress() {
    const doneTasks = (this.project.tasks as ifTask[]).filter(
      (item) => item.status === 'done'
    ).length;
    const totalTasks = (this.project.tasks as ifTask[]).length;
    this.progress = Math.floor((doneTasks / totalTasks) * 100);
  }

  getAppointmentDate() {
    if (this.hasAppointment) {
      this.appointmentDate = new Date(
        this.project.appointment
      ).toLocaleDateString();
    }
  }

  handleClick() {
    this.router.navigate([`project/${this.project._id}`]);
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        this.userData = data;
      });
    this.getLastUpdate();
    this.getRelevantTasks();
    this.getProgress();
    this.getAppointmentDate();
  }
}
