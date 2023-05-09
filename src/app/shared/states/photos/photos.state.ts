import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { photosService } from '../../services/photos.service';
import { PhotoModel } from '../../models/photo.model';
import {
  GetPhotos,
  RemoveFavoriteStatus,
  UpdateFavoriteStatus,
} from './photos.action';
import { patch, updateItem } from '@ngxs/store/operators';

@State<PhotoModel>({
  name: 'photos',
  defaults: {
    photos: [],
  },
})
@Injectable()
export class PhotosState implements NgxsOnInit {
  constructor(private photosService: photosService) {}

  ngxsOnInit(ctx: StateContext<PhotoModel>): void {
    ctx.dispatch(new GetPhotos(1, 12));
  }

  @Selector([PhotosState])
  static photos(state: PhotoModel) {
    return state.photos;
  }

  @Action(GetPhotos)
  getPhotos(ctx: StateContext<PhotoModel>, action: any) {
    this.photosService.getPhotos(action.page, action.limit).subscribe((res) => {
      const state = ctx.getState();
      if (state.photos?.length === 0) {
        ctx.setState({
          ...state,
          photos: res,
        });
      } else {
        ctx.setState({
          ...state,
          photos: [...state.photos, ...res],
        });
      }
    });
  }

  @Action(UpdateFavoriteStatus)
  updateFavoriteStatus(ctx: StateContext<PhotoModel>, action: any) {
    ctx.setState(
      patch({
        photos: updateItem(
          (item) => item.id === action.id,
          patch({ isFavorite: true })
        ),
      })
    );
  }

  @Action(RemoveFavoriteStatus)
  removeFavoriteStatus(ctx: StateContext<PhotoModel>, action: any) {
    ctx.setState(
      patch({
        photos: updateItem(
          (item) => item.id === action.id,
          patch({ isFavorite: false })
        ),
      })
    );
  }
}
