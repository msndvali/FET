import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../template/photos/photos.module').then(
            (m) => m.PhotosModule
          ),
      },
      {
        path: 'photos',
        children: [
          {
            path: ':id',
            loadChildren: () =>
              import(
                '../template/photos/single-photo/single-photo.module'
              ).then((m) => m.SinglePhotoModule),
          },
        ],
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../template/favorites/favorites.module').then(
            (m) => m.FavoritesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
