import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.auth.isAccessTokenInvalido()) {
      return this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalido()) {
            this.router.navigate(['/login']);
            this.messageService.add({severity:'error', summary:'Para acessar o sistema você deve se autenticar!'});
            return false;
          }

          return true;
        });
    } else if (next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)) {
       //this.router.navigate(['/nao-autorizado']);
        this.messageService.add({severity:'error', summary:'Você não tem a autorização necessária!'});
      return false;
    }

    return true;
  }

}
