export interface ItemPhotos {
  description: string;
  id: number;
  title: string;
  url: string;
  user: number;
}

export interface GetPhotosEntity {
  message: string;
  offset: number;
  photos: ItemPhotos[];
  success: true;
  total_photos: number;
}
