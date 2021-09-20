export class Usuario{
  codigo?:number;
  nome?:String;
  email?:String;
  senha?:String;
  cartoes = new Array<Cartao>();
}

export class Login{
  usuario: string;
  senha: string;
}

export class Cartao{
  codigo?:number;
  numeroCartao?:number;
  nome?:String;
  status?:Boolean;
  tipoCartao?:String;
  usuario?:Usuario;
}

