import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PhotosComponent],
  imports: [CommonModule, PhotosRoutingModule, MatProgressSpinnerModule],
})
export class PhotosModule {}
