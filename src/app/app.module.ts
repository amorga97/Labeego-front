import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './store/user.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRegisterModule } from './login-register/login-register.module';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardModule } from './pages/user-dashboard/user-dashboard.module';
import { CoreModule } from './core/core.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ProjectModule } from './pages/project/project.module';
import { NewUserModule } from './pages/new-user/new-user.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage/';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: UserReducer }, {}),
    ReactiveFormsModule,
    FormsModule,
    LoginRegisterModule,
    HttpClientModule,
    UserDashboardModule,
    CoreModule,
    ProjectModule,
    NewUserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
