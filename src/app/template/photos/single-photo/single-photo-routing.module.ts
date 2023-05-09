import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePhotoComponent } from './single-photo.component';

const routes: Routes = [{ path: '', component: SinglePhotoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglePhotoRoutingModule {}
