
import { Component, OnInit ,Input} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  @Input() titulo: string= '';
  componentes: Componente[]=[
    {
      icon:'home-outline',
      name:'Home',
      redirecTo:'/home'
    },
    {
      icon:'add-circle-outline',
      name:'Agregar producto',
      redirecTo:'/agregar'
    },
    {
      icon:'reader-outline',
      name:'Modificar producto',
      redirecTo:'/modificar'
    },
    {
      icon:'trash-outline',
      name:'Eliminar producto',
      redirecTo:'/eliminar'
    },
    {
      icon:'finger-print-outline',
      name:'Huella',
      redirecTo:'/fingerprint'
    }
  ]
  constructor(private menuController: MenuController,
    private auth: AuthService,
    private toastCtrl: ToastController){ }
  ngOnInit() {}
  cerrar(){
    this.menuController.close();
  }
  cerrarSesion(){
    this.presentToast('Sesión cerrada con éxito','noti')
    this.auth.logout();
  }
  async presentToast(message: string,color: string) {
    const toast = await this.toastCtrl.create({
      message,//mensaje
      color,//color del recuadro
      duration: 3000,//duracion en ms
      position: 'bottom'//posicion
    });
    toast.present();
  }
}interface Componente {
  icon: string;
  name:string;
  redirecTo:string;
}