import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(private alertController: AlertController) {}

  initFcm() {
    if (Capacitor.getPlatform() != 'web') {
      this.registerFcm();
    }
  }

  async registerFcm() {
    let permStatus = await PushNotifications.checkPermissions();
    console.log(`Status Notification:`);
    console.log(permStatus);
    if (permStatus.receive != 'granted') {
      PushNotifications.requestPermissions().then((permission) => {
        if (permission.receive == 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          this.notificationHandler();
          return;
        }
      });
      return;
    }

    this.notificationHandler();
  }

  async notificationHandler() {
    await PushNotifications.register();

    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push notification received: ', notification);
        if (!notification.title || !notification.body) {
          return;
        }
        let title = notification.title;
        let message = notification.body;
        this.localNotifi(title, message);
      }
    );

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue
        );
      }
    );

    await PushNotifications.createChannel({
      id: 'Test',
      name: 'custom channel',
      description: 'notifications channel',
      sound: 'res/raw/unconvinced',
      importance: 5,
      visibility: 1,
      lights: true,
      lightColor: '#3366',
      vibration: true,
    }).then(() => {});

    const getDeliveredNotifications = async () => {
      const notificationList =
        await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    };
  }

  async localNotifi(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      //subHeader: 'Important message',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
