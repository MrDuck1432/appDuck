import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FingerprintPageRoutingModule } from './fingerprint-routing.module';

import { FingerprintPage } from './fingerprint.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FingerprintPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FingerprintPage]
})
export class FingerprintPageModule {}
