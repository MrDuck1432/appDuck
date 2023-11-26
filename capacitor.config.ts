import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.patito.miapp',
  appName: 'MiApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
