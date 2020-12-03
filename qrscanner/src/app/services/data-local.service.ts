import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  guardados: Registro[] = [];

  constructor(private storage: Storage, private navCtrl: NavController, private iab: InAppBrowser)  {
    this.cargarStora();
  }

  async cargarStora() {
    this.guardados = (await this.storage.get('registro')) || [];
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarStora();

    const nuevoRegistro = new Registro(format, text);

    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados);

    this.storage.set('registros', this.guardados);
    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        this.iab.create(registro.text, '_system');
        break;

        case 'geo':
          this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;
    }
  }
}
