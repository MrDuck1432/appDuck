import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  async areCredentialsStored(): Promise<boolean> {
    try {
      const username = await SecureStoragePlugin.get({ key: 'username' });
      const password = await SecureStoragePlugin.get({ key: 'password' });
      return !!(username.value && password.value); // Devuelve true si las credenciales existen
    } catch (error) {
      console.error('Error al verificar las credenciales:', error);
      return false;
    }
  }
  
  async setCredentials(username: string, password: string): Promise<void> {
    try {
      await SecureStoragePlugin.set({ key: 'username', value: username });
      await SecureStoragePlugin.set({ key: 'password', value: password });
    } catch (error) {
      console.error('Error al guardar credenciales:', error);
      throw error;
    }
  }

  async getCredentials(): Promise<{ username: string, password: string }> {
    try {
      const username = await SecureStoragePlugin.get({ key: 'username' });
      const password = await SecureStoragePlugin.get({ key: 'password' });
      return { username: username.value, password: password.value };
    } catch (error) {
      console.error('Error al obtener credenciales:', error);
      throw error;
    }
  }

  async removeCredentials(): Promise<void> {
    try {
      await SecureStoragePlugin.remove({ key: 'username' });
      await SecureStoragePlugin.remove({ key: 'password' });
    } catch (error) {
      console.error('Error al eliminar credenciales:', error);
      throw error;
    }
  }
}

