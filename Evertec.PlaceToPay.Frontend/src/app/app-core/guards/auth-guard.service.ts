import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { OAuthAccessService } from 'src/app/app-core/core/services/oauth.access.services';

@Injectable()
export class AuthGuardService implements CanActivate {
  public token: string;

  constructor(
    private router: Router,
    private oauthAccessService: OAuthAccessService
  ) {}

  canActivate(
    routeAc: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.oauthAccessService.validAccessToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.oauthAccessService.validAccessToken();
  }
}
