import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class BaseGenericSimpleService {
  baseAPI: string;
  baseExternalAPI: string;
  nameAPI: string;
  refeshList = false;

  constructor(readonly http: HttpClient, api: string, urlBaseAPI: string = '') {
    if (urlBaseAPI && urlBaseAPI.length > 0) {
      this.baseExternalAPI = urlBaseAPI;
    } else {
      this.baseExternalAPI = environment.baseAPI;
    }

    this.baseAPI = this.baseExternalAPI + api;
    this.nameAPI = api;
  }

  get() {
    return this.http.get(`${this.baseAPI}/`);
  }

  getExterno(externo: string) {
    return this.http.get(`${this.baseExternalAPI + externo}/`);
  }

  getMethod(method: string) {
    return this.http.get(`${this.baseAPI}/${method}`);
  }

  getMethodExterno(externo: string, method: string) {
    return this.http.get(`${this.baseExternalAPI + externo}/${method}`, {
      headers: this.refreshData(),
    });
  }

  getId<TValue>(id: TValue) {
    return this.http.get(`${this.baseAPI}/${id}`, {
      headers: this.refreshData(),
    });
  }

  getIdMethod(method: string, id: number) {
    return this.http.get(`${this.baseAPI}/${method}/${id}`, {
      headers: this.refreshData(),
    });
  }

  getIdMethodExterno<TValue>(externo: string, method: string, id: TValue, interfaz: string, idTypeSignal: number) {
    return this.http.get(`${this.baseExternalAPI + externo}/${method}/${id}/${interfaz}/${idTypeSignal}`, {
      headers: this.refreshData(),
    });
  }

  put<TObject>(ObjEntidad: TObject) {
    return this.http.put(`${this.baseAPI}`, ObjEntidad);
  }

  putMethod<TValue>(method: string, ObjEntidad: TValue) {
    return this.http.put(`${this.baseAPI}/${method}`, ObjEntidad);
  }

  putMethodExterno<TValue>(
    externo: string,
    method: string,
    ObjEntidad: TValue
  ) {
    return this.http.put(
      `${this.baseExternalAPI + externo}/${method}`,
      ObjEntidad
    );
  }

  delete<TValue>(id: TValue) {
    return this.http.delete(`${this.baseAPI}/${id}`);
  }

  deleteMethod<TValue>(method: string, id: TValue) {
    return this.http.delete(`${this.baseAPI}/${method}/${id}`);
  }

  deleteMethodExterno<TValue>(externo: string, method: string, id: TValue) {
    return this.http.delete(
      `${this.baseExternalAPI + externo}/${method}/${id}`
    );
  }

  post<TObject>(ObjEntidad: TObject) {
    return this.http.post(`${this.baseAPI}`, ObjEntidad);
  }

  postMethod<TValue>(method: string, ObjEntidad: TValue) {
    return this.http.post(`${this.baseAPI}/${method}`, ObjEntidad);
  }

  postMethodExterno<TValue>(
    externo: string,
    method: string,
    ObjEntidad: TValue
  ) {
    return this.http.post(
      `${this.baseExternalAPI + externo}/${method}`,
      ObjEntidad
    );
  }

  protected refreshData(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.refeshList) {
      headers = headers.set('reset-cache', 'true');
    }

    return headers;
  }
}
