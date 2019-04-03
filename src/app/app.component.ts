import { Component } from '@angular/core';
import { AuthService } from './seguranca/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registrocliente-ui';

  constructor(
    private auth: AuthService
  ) {}

  isAutenticado(): boolean {
    return this.auth.logado;
  }
}
