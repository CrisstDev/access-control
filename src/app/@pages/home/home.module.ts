import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MessageComponent } from 'src/app/components/message/message.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [HomeComponent, MessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
