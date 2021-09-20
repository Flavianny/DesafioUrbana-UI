import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { CartaoModule } from './cartao/cartao.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    SegurancaModule,
    UsuarioModule,
    ToastModule, 
    CartaoModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class AppModule {

}
