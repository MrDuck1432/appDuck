import { Component, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/services/credentials.service';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.page.html',
  styleUrls: ['./fingerprint.page.scss'],
})
export class FingerprintPage implements OnInit {
  areCredentialsStored = false;
  text: string='Guardar';
  constructor(
    private credentialsService: CredentialsService,
    private msg: MessageService,
    private authService: AuthService,
    ) {}

    async ngOnInit() {
      this.areCredentialsStored = await this.credentialsService.areCredentialsStored();
      this.updateText();
    }

  async agregarHuella() {

    if (this.areCredentialsStored) {
      await this.credentialsService.removeCredentials();
      this.areCredentialsStored = false;
      this.msg.presentToast('Huella borrada con éxito', 'noti');
    } else {
      // Eliminar las credenciales
      await this.authService.saveCredentials();
      this.areCredentialsStored = true;
      this.msg.presentToast('Huella agregada con éxito', 'noti');
    }
  }
  private updateText() {
    this.text = this.areCredentialsStored ? 'Borrar huella' : 'Guardar huella'; // Actualiza el texto del botón
  }
}

