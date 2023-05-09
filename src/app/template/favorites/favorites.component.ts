import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/shared/models/photo.model';
import { FavoritesState } from 'src/app/shared/states/favorites/favorites.state';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  @Select(FavoritesState.favorites) favorites$!: Observable<Photo[]>;

  constructor(private router: Router) {}

  navigateToSinglePhoto(id: number) {
    this.router.navigate(['/photos/' + id]);
  }
}
