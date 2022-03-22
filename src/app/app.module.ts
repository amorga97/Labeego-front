import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './store/user.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRegisterModule } from './login-register/login-register.module';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
