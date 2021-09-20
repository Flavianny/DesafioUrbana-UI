import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cartao } from '../core/model';

export class CartaoFiltro {
  busca: string;
  tipoCartao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    public http: HttpClient,
  ) { }

  salvarCartao(cartao: Cartao): Promise<any>{
    console.log(cartao.numeroCartao)
    return this.http.post(`${this.baseUrl}/cartoes/novo`, cartao)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(response =>{

      if (response.status === 400) {
        return Promise.reject(response.error[0].mensagemUsuario);
      }

      return Promise.reject(response);

    });
  }

  excluirCartao(codigo: number): Promise<void> {
    return this.http.delete(`${this.baseUrl}/cartoes/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}/cartoes/${codigo}`)
      .toPromise()
      .then(cartao => {
        return cartao
      })
  }

  buscar(filtro: CartaoFiltro): Promise<any>{
    return this.http.get(`${this.baseUrl}/cartoes?busca=${filtro.busca}&tipoCartao=${filtro.tipoCartao}`)
  .toPromise()
  .then(response => {
    return response})
  .catch(response =>{

    if (response.status === 400) {
      return Promise.reject(response.error[0].mensagemUsuario);
    }

    return Promise.reject(response);

    });
  }

  mudarStatus(codigo: number, status: boolean): Promise<void> {
    return this.http.put(`${this.baseUrl}/cartoes/${codigo}/status`, status)
      .toPromise()
      .then(() => null);
  }

}