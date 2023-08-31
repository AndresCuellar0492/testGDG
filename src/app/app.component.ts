import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FcmService } from './providers/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private fcmService: FcmService) {
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(() => {
      this.fcmService.initFcm();
    });
  }
}
