import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController, ToastController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from "../../services/data-local.service";

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, public actionSheetController: ActionSheetController, private socialSharing: SocialSharing, private dataLocalService: DataLocalService, public toastController: ToastController) { }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if(this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favotito',
        icon: 'trash-outline',
        handler: async () => {
          this.dataLocalService.borrarNoticia(this.noticia);
          const toast = await this.toastController.create({
            message: 'Borrado de Favorito',
            duration: 2000
          });
          toast.present();
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: async () => {
          this.dataLocalService.guardarNoticia(this.noticia);
          const toast = await this.toastController.create({
            message: 'Agregado de Favorito',
            duration: 2000
          });
          toast.present();
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            this.socialSharing.share(
                this.noticia.title,
                this.noticia.source.name,
                '',
                this.noticia.url
            );
          }
        },
        guardarBorrarBtn,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }
}
