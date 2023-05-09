import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';
import { Observable, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngxs/store';
import { FavoritesState } from '../states/favorites/favorites.state';

@Injectable({
  providedIn: 'root',
})
export class photosService {
  constructor(private http: HttpClient, private store: Store) {}

  getPhotos(page: number, limit: number): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${environment.ApiUrl}v2/list?page=${page}&limit=${limit}`)
      .pipe(
        map((photos: Photo[]) =>
          photos.map((photo) => ({
            ...photo,
            download_url: `https://picsum.photos/id/${photo.id}/300/300`,
          }))
        ),
        switchMap((photos: Photo[]) => {
          return this.store.select(FavoritesState.favorites).pipe(
            map((favorites: Photo[]) =>
              photos.map((photo) => ({
                ...photo,
                isFavorite: favorites.some(
                  (favorite) => +photo.id === +favorite.id
                ),
              }))
            )
          );
        })
      );
  }
}
