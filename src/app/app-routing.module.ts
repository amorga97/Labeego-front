import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user-dash',
    loadChildren: () =>
      import('./pages/user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
  },
  {
    path: 'new-project',
    loadChildren: () =>
      import('./pages/new-project-form/new-project.module').then(
        (m) => m.NewProjectModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
