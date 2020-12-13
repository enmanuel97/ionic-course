import {Component, Input, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {Cast, PeliculaDetalle} from '../../interfaces/interfaces';
import {ModalController} from '@ionic/angular';
import {DataLocalService} from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private moviesService: MoviesService, private modalController: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {

    this.dataLocal.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline');

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      this.pelicula = resp;
      console.log(resp);
    });

    this.moviesService.getActoresPeliculas(this.id).subscribe(resp => {
      console.log(resp);
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalController.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }
}
