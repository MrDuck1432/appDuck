import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

import { CredentialsService } from '../../services/credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {
  form = this.formBuilder.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })
  areCredentialsStored = false;  // Estado inicial del botón
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private router: Router,

    private credentialsService: CredentialsService,

  ) { 
 
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
  async ngOnInit() {
    this.areCredentialsStored = await this.credentialsService.areCredentialsStored();
  }
  login(){
    if (this.form.valid){
      const {email,password}= this.form.getRawValue();
      this.auth.login(email!,password!)
      .then(()=>{
        this.form.reset();
        this.presentToast('Sesión iniciada con exito', 'noti');
        this.router.navigate(['/home'])
      }).catch(error=>{
        this.presentToast('Credenciales no válidas', 'danger');
      })
    }else{
      this.presentToast('Ingrese credenciales', 'danger');
    }
  }  
  
  
  async autofillCredentials() {
    try {
      const { username, password } = await this.credentialsService.getCredentials();
      this.form.patchValue({ email: username, password });
      this.presentToast('Credenciales autorellenadas', 'noti');
    } catch (error) {
      this.presentToast('No se pudieron obtener las credenciales', 'danger');
    }
  }


}

