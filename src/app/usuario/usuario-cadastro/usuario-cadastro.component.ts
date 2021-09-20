import { ErrorHandlerService } from '../../core/error-handler.service';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const codigoUsuario = this.route.snapshot.params['codigo'];
    if (codigoUsuario) {
      this.buscarUsuario(codigoUsuario);
    }

  }

  get editandoUsuario() {
    return Boolean(this.usuario.codigo)
  }

  salvar(form: FormControl) {
    if (this.editandoUsuario) {
      this.atualizar(form);
    } else {
      this.cadastrar(form);
    }
  }

  cadastrar(form: FormControl) {

    this.usuarioService.salvarUsuario(this.usuario)
      .then(avaliadorCadastrado => {
        this.messageService.add({severity:'success', summary:'Usuário cadastrado!'});
        this.usuario = new Usuario();
        this.router.navigate(['/usuarios'])
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      })
  }

  atualizar(form: FormControl) {
    this.usuarioService.atualizarUsuario(this.usuario)
      .then(usuario => {
        this.usuario = usuario;
        this.usuario = new Usuario();
        this.messageService.add({severity:'success', summary:'Usuário atualizado!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  buscarUsuario(codigo: number) {
      this.usuarioService.buscarPorCodigo(codigo)
    .then(usuario => {
      this.usuario = usuario;
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

}
