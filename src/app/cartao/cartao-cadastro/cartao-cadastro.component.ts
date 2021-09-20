import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cartao, Usuario } from 'src/app/core/model';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { CartaoService } from '../cartao.service';

@Component({
  selector: 'app-cartao-cadastro',
  templateUrl: './cartao-cadastro.component.html',
  styleUrls: ['./cartao-cadastro.component.css']
})
export class CartaoCadastroComponent implements OnInit {

  cartao = new Cartao();
  usuario = new Usuario();
  tiposCartao= [{nome:"Comum", tipo:"COMUM"},{nome:"Estudante",tipo:"ESTUDANTE"},{nome:"Trabalhador",tipo:"TRABALHADOR"}]
  tipoSelecionado: any;

  constructor(
    private cartaoService: CartaoService,
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const codigoUsuario = this.route.snapshot.params['codigoUsuario'];
    const codigoCartao = this.route.snapshot.params['codigo'];
    this.buscarUsuario(codigoUsuario);
    if(codigoCartao){
      this.buscarCartao(codigoCartao)
    }

  }

  get editandoCartao() {
    return Boolean(this.cartao.codigo)
  }

  salvar(form: FormControl) {
    if (this.editandoCartao) {
      
    } else {
      this.cadastrar(form);
    }
  }

  cadastrar(form: FormControl) {
    this.cartao.tipoCartao = this.tipoSelecionado.tipo;
    this.cartao.usuario = this.usuario;
    console.log(this.cartao.tipoCartao)
    this.cartaoService.salvarCartao(this.cartao)
      .then(cartaoCadastrado => {
        this.messageService.add({severity:'success', summary:'Cartão cadastrado!'});
        this.cartao = new Cartao();
        this.router.navigate(['/usuarios' , this.usuario.codigo, 'cartoes'])
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      })
  }

  buscarCartao(codigo: number) {
    this.cartaoService.buscarPorCodigo(codigo)
  .then(cartao => {
    this.cartao = cartao;
    this.tipoSelecionado = cartao
  })
  .catch(erro => this.errorHandler.handle(erro))
}

  buscarUsuario(codigo: number) {
      this.usuarioService.buscarPorCodigo(codigo)
    .then(usuario => {
      this.usuario = usuario;
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

}
