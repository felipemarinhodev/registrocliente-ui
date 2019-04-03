import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MascaraDirective } from './diretivas/mascara.directive';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    CpfPipe,
    NavBarComponent,
    MascaraDirective,
    TelefonePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    ButtonModule,
  ],
  exports:
  [
    RouterModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    CpfPipe,
    TelefonePipe,
    NavBarComponent,
    MascaraDirective,
  ]
})
export class SharedModule { }
