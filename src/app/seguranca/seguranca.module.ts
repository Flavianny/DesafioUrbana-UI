import { SharedModule } from './../shared/shared.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {DividerModule} from 'primeng/divider';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';
import { DesafioUrbanaHttpInterceptor } from './desafioUrbana-http-interceptor';
import { CardModule } from 'primeng/card';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    DividerModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    PasswordModule,
    SharedModule,
    UsuarioModule,
    CardModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),


  ],
  exports: [LoginFormComponent],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DesafioUrbanaHttpInterceptor,
      multi: true
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }

