import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './services/auth.service';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
   ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.auth.temToken()) {
        this.router.navigate(['/login']);
        return false;
      } else if (!this.auth.temQualquerPermissao()) {
        this.router.navigate(['/nao-autorizado']);
        return false;
      }
    return true;
  }
}
