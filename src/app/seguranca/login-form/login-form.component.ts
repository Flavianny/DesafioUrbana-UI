import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormControl } from '@angular/forms';
import { Login } from 'src/app/core/model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  login = new Login();
  dialogIsVisible: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
  ) { }

  logar(form: FormControl) {

    this.auth.login(this.login)
      .then(() => {
        this.router.navigate(['/home']);
        this.messageService.add({severity:'success', summary:'Você entrou!'});
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      })
  }

  showDialog() {
    this.dialogIsVisible = true;
}

  exitDialog() {
    this.dialogIsVisible = false;
  }

}
