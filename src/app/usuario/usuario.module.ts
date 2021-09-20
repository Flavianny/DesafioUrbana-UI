import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { UsuarioService } from './usuario.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    UsuarioCadastroComponent,
    UsuariosComponent
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
    CardModule
  ],
  providers: [
    UsuarioService
  ],
  exports: [UsuarioCadastroComponent]
})
export class UsuarioModule { }
