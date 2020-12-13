import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }
  
  configuracionInicial() {
      this.oneSignal.startInit('e19520b5-51ab-47a9-8a7a-17568fbdc94a', '936564595423');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe((noti) => {
          console.log('Noticacion recibida', noti);
          // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe((noti) => {
          // do something when a notification is opened
          console.log('Noticacion abierta', noti);
      });

      this.oneSignal.endInit();
  }
}
