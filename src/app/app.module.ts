import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule, provideFirebaseApp(() => initializeApp({"projectId":"ev2vfinal","appId":"1:336853966680:web:ff0dff01b3e7bdc4db8f2d","storageBucket":"ev2vfinal.appspot.com","apiKey":"AIzaSyACz3ELaN4jq5lu9Dcvel9kcG1fxQAlX0c","authDomain":"ev2vfinal.firebaseapp.com","messagingSenderId":"336853966680"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
            ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
