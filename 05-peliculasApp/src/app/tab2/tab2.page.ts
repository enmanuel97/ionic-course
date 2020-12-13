import { Component } from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Pelicula} from '../interfaces/interfaces';
import {DetalleComponent} from '../components/detalle/detalle.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  buscando = false;
  ideas: string[] = ['Spiderman', 'Avenger', 'El señol de los anillos', 'A dos metros de ti'];

  constructor(private movieService: MoviesService, private modartCtrl: ModalController) {}

  buscar(event) {
    const texto = event.detail.value;

    if(texto === '') {
      this.buscando = false;
      this.peliculas = [];
    } else {
      this.buscando = true;
      this.movieService.buscarPelicula(event.detail.value).subscribe((resp: any) => {
        this.peliculas = resp.results;
        this.buscando = false;
      });
    }
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

  ionViewWillEnter() {
    console.log('Cambie');
    this.textoBuscar = '';
    this.buscando = false;
    this.peliculas = [];
  }
}
