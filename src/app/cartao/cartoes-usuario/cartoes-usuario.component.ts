import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cartao, Usuario } from 'src/app/core/model';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-cartoes-usuario',
  templateUrl: './cartoes-usuario.component.html',
  styleUrls: ['./cartoes-usuario.component.css']
})
export class CartoesUsuarioComponent implements OnInit {

  usuario = new Usuario();
  cartoes: Cartao[]= [];
  codigoUsuario = this.route.snapshot.params['codigoUsuario'];

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit(): void {
    
    this.buscarUsuario(this.codigoUsuario);
  }

  buscarUsuario(codigo: number) {
      this.usuarioService.buscarPorCodigo(codigo)
    .then(usuario => {
      this.usuario = usuario;
      this.cartoes = usuario.cartoes;
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  
  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Você tem certeza que deseja excluir esse cartão?',
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
      this.buscarUsuario(this.codigoUsuario);
        this.messageService.add({severity:'success', summary:'Cartão excluído!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}