import { Login } from './../core/model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;
  codigoUsuario;

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient) {
    this.carregarToken();
  }

  login(login: Login): Promise<void> {


    // usuario: string, senha: string

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic dGVzdGU6dGVzdGU=');

    const body = `username=${login.usuario}&password=${login.senha}&grant_type=password`;
    console.log(login.senha+ login.usuario)
    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic dGVzdGU6dGVzdGU=');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    this.codigoUsuario = this.jwtPayload.codigo;
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  pegarCodigoUsuario(){
    return this.codigoUsuario;
  }
}
