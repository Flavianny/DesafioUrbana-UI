
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Cartao, Usuario } from 'src/app/core/model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuario = new Usuario();
  busca: any;
  cartoes: Cartao[]= [];
  display: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.usuarioService.buscarUsuarios({busca: this.busca})
      .then(resultado => {
        this.usuarios = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Você tem certeza que deseja excluir esse usuário?',
      header: 'Atenção!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluirConta(usuario.codigo)
    .then(() => {
          this.pesquisar();
        this.messageService.add({severity:'success', summary:'Usuário excluído!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
