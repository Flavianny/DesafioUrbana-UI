import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoCadastroComponent } from './cartao-cadastro/cartao-cadastro.component';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { CartaoService } from './cartao.service';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CartoesUsuarioComponent } from './cartoes-usuario/cartoes-usuario.component';
import { CartoesComponent } from './cartoes/cartoes.component';
import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [
    CartaoCadastroComponent,
    CartoesUsuarioComponent,
    CartoesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CardModule,
    PasswordModule,
    SharedModule,
    RouterModule,
    TableModule,
    DataViewModule,
    TooltipModule,
    ConfirmDialogModule,
    TabViewModule,
    CardModule,
    RadioButtonModule,
    DropdownModule,
    InputSwitchModule
  ]
  ,
  providers: [
    CartaoService
  ],
  exports: [CartaoCadastroComponent]
})
export class CartaoModule { }
