import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pelicula} from '../../interfaces/interfaces';
import {DetalleComponent} from '../detalle/detalle.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  constructor(private modartCtrl: ModalController) { }

  ngOnInit() {}

  onClick() {
    this.cargarMas.emit();
  }

  async verDetalle(id) {
    const modal = await this.modartCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
