import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { from } from 'rxjs';
import {
  GetPhotosEntity,
  ItemPhotos,
} from 'src/app/entities/get-photos.entity';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageElement: string | undefined;
  vowels = from(['a', 'e', 'i', 'o', 'u']);
  dataPhotos: ItemPhotos[] = [];
  constructor(private apiService: ApiService) {
    console.log('Constructor');
    this.getData();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ngOnInit(): void {
    console.log('Ngoninit');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.vowels.subscribe({
      next: (x) => console.log('The next vowel is: ', x),
      error: (err) => console.error('An error occurred', err),
      complete: () => console.log('There are no more vowels.'),
    });
  }

  async getData() {
    this.apiService.getPhotos().subscribe({
      next: (response: GetPhotosEntity) => {
        console.info(`Data es : `, response);
        this.dataPhotos = response.photos;
        console.log(this.dataPhotos);
      },
      error: (err) => console.log(`Error es ${err}`),
      complete: () => console.log('Completado'),
    });
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true,
    });

    console.log(image);
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    this.imageElement = image.webPath;

    // Can be set to the src of an image now
  }
}
