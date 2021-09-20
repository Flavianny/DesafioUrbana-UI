import { HomeComponent } from './home/home/home.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { AuthGuard } from './seguranca/auth.guard';
import { UsuarioCadastroComponent } from './usuario/usuario-cadastro/usuario-cadastro.component';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { CartaoCadastroComponent } from './cartao/cartao-cadastro/cartao-cadastro.component';
import { CartoesUsuarioComponent } from './cartao/cartoes-usuario/cartoes-usuario.component';
import { CartoesComponent } from './cartao/cartoes/cartoes.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },
  { path: 'usuarios/novo', component: UsuarioCadastroComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },
  { path: 'usuarios/:codigo', component: UsuarioCadastroComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },
  { path: 'usuarios/:codigoUsuario/cartoes', component: CartoesUsuarioComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },
  { path: 'usuarios/:codigoUsuario/cartoes/novo', component: CartaoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },
  { path: 'usuarios/:codigoUsuario/cartoes/:codigo', component: CartaoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },
  { path: 'cartoes', component: CartoesComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO'] } },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }

];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]

})
export class AppRoutingModule {



}
