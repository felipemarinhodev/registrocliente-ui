import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClientePesquisaComponent } from './components/cliente-pesquisa/cliente-pesquisa.component';

import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ClienteViewComponent } from './components/cliente-view/cliente-view.component';


@NgModule({
  declarations: [ClientePesquisaComponent, ClienteFormComponent, ClienteViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    ClienteRoutingModule,

    // PrimeNG
    PanelModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    ConfirmDialogModule,
  ]
})
export class ClientesModule { }
