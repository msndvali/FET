export class PhotoModel {
  photos!: Photo[];
  status?: string;
}

export class Photo {
  id!: number;
  author!: string;
  width!: number;
  height!: number;
  url!: string;
  download_url!: string;
  isFavorite?: boolean;
}
