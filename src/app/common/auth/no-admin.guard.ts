import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class NoAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isAdmin = this.authService.isAdmin.getValue();
    return of(!isAdmin);
  }
  
}
