import { Photo } from '../../models/photo.model';

export class AddFavorites {
  static readonly type = '[Favorites] add favorites';
  constructor(public photo: Photo) {}
}

export class RemoveFavorites {
  static readonly type = '[Favorites] remove favorites';
  constructor(public id: number) {}
}
