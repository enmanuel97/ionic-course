import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  guardados: Registro[] = [];

  constructor(private storage: Storage, private navCtrl: NavController, private iab: InAppBrowser, private file: File, private emailComposer: EmailComposer)  {
    this.cargarStora();
  }

  async cargarStora() {
    this.guardados = (await this.storage.get('registro')) || [];
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarStora();

    const nuevoRegistro = new Registro(format, text);

    this.guardados.unshift(nuevoRegistro);

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

  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push(titulos);
    this.guardados.forEach(registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;
      arrTemp.push(linea);
    })

    this.crearArchivoFisico(arrTemp.join(''))
  }

  crearArchivoFisico(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'registros.csv').then(existe => {
      console.log('Existe archivo?', existe);
      return this.escribirEnArchivo(text);
    }).catch(err => {
      return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
                  .then(creado => this.escribirEnArchivo(text))
                  .catch(err2 => console.log('No se pudo crear el archivo', err2));
    })
  }

  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    console.log(this.file.dataDirectory + 'registros.csv');

    const archivo = `${this.file.dataDirectory}registros.csv`;

    const email = {
      to: 'edelacruz9713@gmail.com',
      //cc: '',
      //bcc: ['', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Backup de scans',
      body: 'Aqui tiene sus backups de los scans - ScanApp',
      isHtml: true
    }

// Send a text message using default options
    this.emailComposer.open(email);
  }
}
