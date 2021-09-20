import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [MenuComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  exports: [MenuComponent],
  providers: [
    AuthService,
    ErrorHandlerService,
    JwtHelperService,
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }

