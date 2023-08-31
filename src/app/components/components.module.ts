import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CardPhotoComponent } from './card-photo/card-photo.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CardPhotoComponent, CardSkeletonComponent],
  exports: [CardPhotoComponent, CardSkeletonComponent],
})
export class ComponentsModule {}
