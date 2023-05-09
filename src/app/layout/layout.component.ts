import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { FavoritesState } from '../shared/states/favorites/favorites.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Select(FavoritesState.favoritesLength) favoritesLength$!: Observable<number>;

  constructor() {}
}
