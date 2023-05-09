import { Component, HostListener, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Photo } from 'src/app/shared/models/photo.model';
import { AddFavorites } from 'src/app/shared/states/favorites/favorites.action';
import {
  GetPhotos,
  UpdateFavoriteStatus,
} from 'src/app/shared/states/photos/photos.action';
import { PhotosState } from 'src/app/shared/states/photos/photos.state';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  isLoading: boolean = false;
  page: number = 1;
  limit: number = 12;

  @Select(PhotosState.photos) photos$!: Observable<Photo[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.photos$.subscribe((_) => (this.isLoading = false));
  }

  getPhotos(page: number, limit: number) {
    this.store.dispatch(new GetPhotos(page, limit));
  }

  addFavorites(photo: Photo) {
    this.store.dispatch(new AddFavorites(photo));
    this.store.dispatch(new UpdateFavoriteStatus(photo.id));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos === max && !this.isLoading) {
      this.page += 1;
      this.isLoading = true;
      setTimeout(() => {
        this.getPhotos(this.page, this.limit);
      }, 2000);
    }
  }
}
