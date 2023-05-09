import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinglePhotoRoutingModule } from './single-photo-routing.module';
import { SinglePhotoComponent } from './single-photo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogModule } from 'src/app/shared/helpers/delete-dialog/delete-dialog.module';

@NgModule({
  declarations: [SinglePhotoComponent],
  imports: [
    CommonModule,
    SinglePhotoRoutingModule,
    MatDialogModule,
    MatButtonModule,
    DeleteDialogModule,
  ],
})
export class SinglePhotoModule {}
