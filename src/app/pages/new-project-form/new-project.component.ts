import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ifClient, UserStore } from 'src/app/interfaces/interfaces';
import { ClientsService } from 'src/app/services/clients.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectFormComponent implements OnInit {
  userId!: string;
  newProjectForm!: FormGroup;
  newClientForm!: FormGroup;
  token!: string;
  userData!: UserStore;
  clients!: ifClient[];
  selectedClientId!: string;
  alertIsError: boolean = false;
  alertIsActive: boolean = false;
  alertMessage!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ user: UserStore }>,
    private clientService: ClientsService,
    private projects: ProjectsService
  ) {
    this.newProjectForm = fb.group({
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
    this.newClientForm = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      street: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      number: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  getClients() {
    console.log(this.userData.token);
    this.clientService.getAllClients(this.userData.token).subscribe((data) => {
      this.clients = data;
    });
  }

  handleClick(item: ifClient) {
    this.selectedClientId = item._id;
    console.log(this.selectedClientId);
  }

  handleProjectSubmit() {
    console.log(this.selectedClientId);
    if (this.newProjectForm.valid && this.selectedClientId) {
      this.projects
        .create(this.userData.token, {
          ...this.newProjectForm.value,
          client: this.selectedClientId,
        })
        .subscribe({
          next: (data) => {
            this.alertIsActive = true;
            this.alertMessage = '¡Proyecto creado!';
            setTimeout(() => {
              this.alertIsActive = false;
              this.alertIsError = false;
              this.router.navigate([`project/${data._id}`]);
            }, 2000);
          },
          error: () => {
            this.alertIsActive = true;
            this.alertIsError = true;
            this.alertMessage = 'Ha ocurrido un problema creando tu proyecto';
            setTimeout(() => {
              this.alertIsActive = false;
              this.alertIsError = false;
            }, 2000);
          },
        });
    } else {
      this.alertIsActive = true;
      this.alertIsError = true;
      this.alertMessage = 'Completa todos los campos obligatorios';
      setTimeout(() => {
        this.alertIsActive = false;
        this.alertIsError = false;
      }, 2000);
    }
  }

  handleClientSubmit() {
    this.clientService
      .create(this.userData.token, {
        name: this.newClientForm.value.name as string,
        email: this.newClientForm.value.email as string,
        address: {
          number: +this.newClientForm.value.number,
          street: this.newClientForm.value.street as string,
        },
      })
      .subscribe({
        next: (data) => {
          this.alertIsActive = true;
          this.alertMessage = 'Cliente añadido';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
          }, 1500);
        },
        error: () => {
          this.alertIsActive = true;
          this.alertIsError = true;
          this.alertMessage = 'Ha ocurrido un problema añadiendo tu cliente';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
          }, 2000);
        },
      });
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
        },
      });
    this.getClients();
  }
}
