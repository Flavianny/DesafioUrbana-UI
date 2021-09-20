import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
      :host ::ng-deep button {
          margin-right: .25em;
      }
  `]
})
export class AppComponent {

    ngOnInit() {
    }

    constructor(
      private router: Router,
      ) {
    }

    exibindoMenu() {

      const url = this.router.url;

      if(url.includes('/login')
      || url.includes('/pagina-nao-encontrada')){

        return false;
      }else{
        return true;
      }

    }


}
