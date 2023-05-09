import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, switchMap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/shared/helpers/delete-dialog/delete-dialog.component';
import { RemoveFavorites } from 'src/app/shared/states/favorites/favorites.action';
import { FavoritesState } from 'src/app/shared/states/favorites/favorites.state';
import { RemoveFavoriteStatus } from 'src/app/shared/states/photos/photos.action';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
})
export class SinglePhotoComponent {
  singlePhoto$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.store
        .select(FavoritesState.favorites)
        .pipe(
          map((favorites) =>
            favorites.find((f: any) => f.id === params.get('id'))
          )
        )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    public dialog: MatDialog
  ) {}

  removeFavorites(id: number) {
    this.dialog
      .open(DeleteDialogComponent, {
        width: '30%',
        data: {
          message: 'Are you sure want to remove?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (!res) {
          return;
        }
        this.store.dispatch(new RemoveFavorites(id)).subscribe((_) => {
          this.store.dispatch(new RemoveFavoriteStatus(id));
          this.router.navigate(['/']);
        });
      });
  }
}
