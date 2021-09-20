import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ErrorHandlerService } from '../error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { LogoutService } from '../../seguranca/logout.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  visibleSidebar1;

  constructor(
    private primengConfig: PrimeNGConfig,
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
        this.messageService.add({ severity: 'success', summary: 'Você saiu!' });
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

}
