import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemPhotos } from 'src/app/entities/get-photos.entity';

@Component({
  selector: 'card-photo',
  templateUrl: './card-photo.component.html',
  styleUrls: ['./card-photo.component.scss'],
})
export class CardPhotoComponent implements OnInit {
  @Output() public tappedButton = new EventEmitter();
  @Input() public dataPhotos: ItemPhotos[] = [];

  constructor() {}

  ngOnInit() {}

  public onTapButton(item: ItemPhotos) {
    this.tappedButton.emit(item);
  }
}
