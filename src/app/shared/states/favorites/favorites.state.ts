import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { photosService } from '../../services/photos.service';
import { PhotoModel } from '../../models/photo.model';
import { AddFavorites, RemoveFavorites } from './favorites.action';
import { patch, removeItem, updateItem } from '@ngxs/store/operators';

@State<PhotoModel>({
  name: 'favorites',
  defaults: {
    photos: [],
  },
})
@Injectable()
export class FavoritesState {
  @Selector([FavoritesState])
  static favorites(state: PhotoModel) {
    return state.photos;
  }

  @Selector([FavoritesState])
  static favoritesLength(state: PhotoModel) {
    return state.photos.length;
  }

  @Action(AddFavorites)
  addFavorites(ctx: StateContext<PhotoModel>, action: any) {
    const state = ctx.getState();
    const item = state.photos.some((x) => x.id === action.photo.id);
    if (!item) {
      ctx.setState({
        ...state,
        photos: [...state.photos, action.photo],
      });
    }
  }

  @Action(RemoveFavorites)
  removeFavorites(ctx: StateContext<PhotoModel>, action: any) {
    ctx.setState(
      patch({
        photos: removeItem((item) => item.id === action.id),
      })
    );
  }
}
