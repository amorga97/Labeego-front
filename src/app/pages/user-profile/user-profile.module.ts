import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { CoreModule } from 'src/app/core/core.module';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    NgxDropzoneModule,
  ],
})
export class UserProfileModule {}
