
import { Usuario} from '../core/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

export class UsuarioFiltro {
  busca: any;
}

@Injectable()
export class UsuarioService{

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    public http: HttpClient
  ) { }

  salvarUsuario(usuario: Usuario): Promise<any>{

    return this.http.post(`${this.baseUrl}/usuarios/novo`, usuario)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(response =>{

        if (response.status === 400 || response.status === 409) {
          return Promise.reject(response.error[0].mensagemUsuario);
        }

        return Promise.reject(response);

      });
  }

  atualizarUsuario(usuario: Usuario): Promise<any> {
    console.log("teste")
    const params = {nome: usuario.nome, email: usuario.email}
    return this.http.put(`${this.baseUrl}/usuarios/${usuario.codigo}`, params)
      .toPromise()
      .then(response => {
        const usuarioAlterado = response;

        return usuarioAlterado;
      })
      .catch(response =>{

        if (response.status === 400) {
          return Promise.reject(response.error[0].mensagemUsuario);
        }

        return Promise.reject(response);

      });
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {
    return this.http.get(`${this.baseUrl}/usuarios/${codigo}`)
      .toPromise()
      .then(response => {
        const usuario = response as Usuario;
        return usuario;
      });
  }

  excluirConta(codigo: number): Promise<void> {
    return this.http.delete(`${this.baseUrl}/usuarios/${codigo}`)
      .toPromise()
      .then(response => {null})
      .catch(response =>{

        if (response.status === 400) {
          return Promise.reject(response.error[0].mensagemUsuario);
        }

        return Promise.reject(response);

      });
      
  }

  buscarUsuarios(filtro: UsuarioFiltro): Promise<any> {
    let params = new HttpParams();
    return this.http.get<any>(`${this.baseUrl}/usuarios?busca=${filtro.busca}`)
      .toPromise()
      .then(response => {return response})
    .catch(erro =>{
      console.log(erro);
    });
  }

}
