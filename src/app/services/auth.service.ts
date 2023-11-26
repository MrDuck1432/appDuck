import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private email: string="";
  private password: string="";

  constructor(
    private afAuth:Auth,
    private credentialsService: CredentialsService
  ) { }

  register(email: string,password: string){
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }
  
  async login(email: string, password: string) {
    try {
      const credentials = await signInWithEmailAndPassword(this.afAuth, email, password);
      this.email=email;
      this.password=password;
      console.log(this.email,this.password);
      return credentials;
    } catch (error) {
      throw error;
    }
  }
  
  logout(){
    return signOut(this.afAuth);
  }

  async saveCredentials() {
    try {
      await this.credentialsService.setCredentials(this.email, this.password);
      console.log('bien');//borrar
    } catch (error) {
      console.error('Error al guardar credenciales:', error);//borrar luego de probar
      throw error;
    }
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(true); // Usuario autenticado
        } else {
          resolve(false); // Usuario no autenticado
        }
      });
    });
  }
}