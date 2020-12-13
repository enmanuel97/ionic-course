import {Component, OnInit, ViewChild} from '@angular/core';
import {NoticiasService} from '../../services/noticias.service';
import {Article} from '../../interfaces/interfaces';
import {IonSegment} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild('ionSegment', {static: true}) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(data => {
      this.noticias.push(...data.articles);
      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }
}
