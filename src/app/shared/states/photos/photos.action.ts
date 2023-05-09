export class GetPhotos {
  static readonly type = '[Photos] get photos';
  constructor(public page: number, public limit: number) {}
}

export class UpdateFavoriteStatus {
  static readonly type = '[Photos] update favorite status';
  constructor(public id: number) {}
}

export class RemoveFavoriteStatus {
  static readonly type = '[Photos] remove favorite status';
  constructor(public id: number) {}
}
