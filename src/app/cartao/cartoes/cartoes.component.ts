import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cartao, Usuario } from 'src/app/core/model';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { CartaoFiltro, CartaoService } from '../cartao.service';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.css']
})
export class CartoesComponent implements OnInit {

  usuario = new Usuario();
  cartoes: Cartao[]= [];
  codigoUsuario = this.route.snapshot.params['codigoUsuario'];
  busca: any;
  tiposCartao= ["COMUM","ESTUDANTE", "TRABALHADOR"]
  tipoCartao: any;

  constructor(
    private cartaoService: CartaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.pesquisar()
  }

  pesquisar() {
    const cartaoFiltro = new CartaoFiltro();
    cartaoFiltro.busca = this.busca;
    cartaoFiltro.tipoCartao = this.tipoCartao;
    this.cartaoService.buscar(cartaoFiltro)
      .then(resultado => {
        this.cartoes = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(cartao: any) {
    this.confirmation.confirm({
      message: 'Você tem certeza que deseja excluir esse cartão?',
      header: 'Atenção!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(cartao);
      }
    });
  }

  excluir(cartao: any) {
    this.cartaoService.excluirCartao(cartao.codigo)
    .then(() => {
        this.pesquisar()
        this.messageService.add({severity:'success', summary:'Cartão excluído!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(cartao: any): void {
    let status= true;
    if(cartao.status == true)
      status = false;
    this.cartaoService.mudarStatus(cartao.codigo, status)
      .then(() => {
        const acao = status ? 'desativado' : 'ativado';
        this.messageService.add({severity:'success', summary:`Cartão ${acao}!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
