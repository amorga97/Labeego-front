import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewUserRoutingModule } from './new-user-routing.module';
import { NewUserComponent } from './new-user.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewUserComponent],
  imports: [
    CommonModule,
    NewUserRoutingModule,
    CoreModule,
    ReactiveFormsModule,
  ],
})
export class NewUserModule {}
