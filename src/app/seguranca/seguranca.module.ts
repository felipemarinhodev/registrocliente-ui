import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    SharedModule,

    PanelModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,

    SegurancaRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class SegurancaModule { }
