import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(private barcodeScanner: BarcodeScanner, private dataLocal: DataLocalService) {}

  ionViewDidEnter() {

  }

  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
     if(!barcodeData.cancelled) {
       this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
     }
    }).catch(err => {
      this.dataLocal.guardarRegistro('QRCode', 'https://enmanueldelacruz.me');
    });
  }
}
