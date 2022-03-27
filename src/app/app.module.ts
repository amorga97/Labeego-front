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

const firebaseConfig = {
  apiKey: 'AIzaSyCFoNdju5Y2lBTbG0YLSZdsKy7phVBlVcs',
  authDomain: 'final-isdi-coders.firebaseapp.com',
  projectId: 'final-isdi-coders',
  storageBucket: 'final-isdi-coders.appspot.com',
  messagingSenderId: '649528423764',
  appId: '1:649528423764:web:92f3c8ba54d724bcb5c4c1',
};
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
    AngularFireModule.initializeApp(firebaseConfig),
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
