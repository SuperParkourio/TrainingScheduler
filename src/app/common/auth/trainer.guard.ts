import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isTrainer = this.authService.isTrainer.getValue();
    return of(isTrainer);
  }
}
