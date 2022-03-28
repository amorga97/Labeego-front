import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';

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
  {
    path: 'project/:id',
    loadChildren: () =>
      import('./pages/project/project.module').then((m) => m.ProjectModule),
  },
  {
    path: 'create-user',
    loadChildren: () =>
      import('./pages/new-user/new-user.module').then((m) => m.NewUserModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  { path: '', component: LandingComponent },
  { path: 'home', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
