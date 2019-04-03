import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { ClientesModule } from './pages/clientes/clientes.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { ClienteRoutingModule } from './pages/clientes/cliente-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ClientesModule,
    SegurancaModule,
    ClienteRoutingModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
