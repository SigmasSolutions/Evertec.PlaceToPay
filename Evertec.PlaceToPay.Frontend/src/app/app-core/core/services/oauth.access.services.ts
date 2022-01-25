import { Injectable } from '@angular/core';
import { IAuthAccessService } from '@appcore/services/oauth.access.interface';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root',
})
export class OAuthAccessService implements IAuthAccessService {
  constructor(readonly localStorageServ: LocalStorageService) {}

  /**
   * Obtener el Token oAuth de ADFS
   */
  public getAccessToken(): string {
    const user = JSON.parse(this.localStorageServ.get('user'));
    return user?.token;
  }

  /**
   * Obtener el Nombre del Usuario Autenticado
   */
  public getUser(): string {
    return '';
  }

  /**
   * Obtener el Imagen del Usuario Autenticado
   */
  public getImg(): string {
    return '';
  }

  /**
   * Valida si la sesión esta activa
   */
  public validAccessToken(): boolean {
    return this.localStorageServ.get('user') !== null;
  }

  /**
   * Cierra la session activa de ADFS
   */
  public logOut(): void {
    this.localStorageServ.clear();
  }

  /**
   * Inicializa el Componente de oauth2-oidc para la autenticacion con ADFS
   */
  public initializeOAuthService(): void {}
}
