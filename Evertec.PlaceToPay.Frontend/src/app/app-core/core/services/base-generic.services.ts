import { HttpClient } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { Filters } from '@appcore/objects/filter.object';
import { BaseGenericSimpleService } from '@appcore/services/base-generic.simple.services';

export class BaseGenericService<T> extends BaseGenericSimpleService {

  constructor(readonly http: HttpClient, api: string, urlBaseAPI: string = '') {
    super(http, api, urlBaseAPI);
  }

  getPaged(page: number, numberRecord = 0, filters: Filters = null) {
    if (filters) {
      return this.http.post(
        `${this.baseAPI}/GetPaged/${page}` +
          (numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''),
        filters
      );
    } else {
      return this.http.get(
        `${this.baseAPI}/GetPaged/${page}` +
          (numberRecord && numberRecord > 0 ? `/${numberRecord}` : '')
      );
    }
  }

  getPagedMethod(
    method: string,
    page: number,
    numberRecord = 0,
    filters: Filters = null
  ) {
    if (filters) {
      return this.http.post(
        `${this.baseAPI}/${method}/${page}` +
          (numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''),
        filters
      );
    } else {
      return this.http.get(
        `${this.baseAPI}/${method}/${page}` +
          (numberRecord && numberRecord > 0 ? `/${numberRecord}` : '')
      );
    }
  }

  getPagedOrdered(
    page: number,
    column: string,
    direction: string,
    numberRecord = 0,
    filters: Filters = null
  ) {
    if (filters) {
      return this.http.post(
        `${this.baseAPI}/${
          numberRecord && numberRecord > 0
            ? 'GetRecordsOrderPaged'
            : 'GetOrderPaged'
        }/${page}${
          numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''
        }/${column}/${direction}`,
        filters
      );
    } else {
      return this.http.get(
        `${this.baseAPI}/${
          numberRecord && numberRecord > 0
            ? 'GetRecordsOrderPaged'
            : 'GetOrderPaged'
        }/${page}${
          numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''
        }/${column}/${direction}`
      );
    }
  }

  getPagedOrderedMethod(
    method: string,
    page: number,
    column: string,
    direction: string,
    numberRecord: number
  ) {
    return this.http.get(
      `${this.baseAPI}/${method}/${page}${
        numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''
      }/${column}/${direction}`
    );
  }

  getPagedOrderedSort(
    page: number,
    sort: Sort,
    numberRecord = 0,
    filters: Filters = null
  ) {
    return this.getPagedOrderedSortDinamyc(
      `${this.baseAPI}/${
        numberRecord && numberRecord > 0
          ? 'GetRecordsOrderPaged'
          : 'GetOrderPaged'
      }`,
      page,
      sort,
      numberRecord,
      filters
    );
  }

  getPagedOrderedSortMethod(
    method: string,
    page: number,
    sort: Sort,
    numberRecord = 0,
    filters: Filters = null
  ) {
    return this.getPagedOrderedSortDinamyc(
      `${this.baseAPI}/${method}`,
      page,
      sort,
      numberRecord,
      filters
    );
  }

  private getPagedOrderedSortDinamyc(
    url: string,
    page: number,
    sort: Sort,
    numberRecord: number,
    filters: Filters = null
  ) {
    if (sort) {
      if (!(!sort.active || sort.direction === '')) {
        if (filters) {
          return this.http.post(
            `${url}/${page}${
              numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''
            }/${sort.active}/${sort.direction}`,
            filters,
            {
              headers: this.refreshData(),
            }
          );
        } else {
          return this.http.get(
            `${url}/${page}${
              numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''
            }/${sort.active}/${sort.direction}`,
            {
              headers: this.refreshData(),
            }
          );
        }
      }
    }

    if (filters) {
      return this.http.post(
        `${url}/${page}${
          numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''
        }`,
        filters,
        {
          headers: this.refreshData(),
        }
      );
    } else {
      return this.http.get(
        `${url}/${page}${
          numberRecord && numberRecord > 0 ? `/${numberRecord}` : ''
        }`,
        {
          headers: this.refreshData(),
        }
      );
    }
  }

  update(ObjEntidad: T) {
    return this.put(ObjEntidad);
  }

  create(ObjEntidad: T) {
    return this.post(ObjEntidad);
  }

  getFileExterno(externo: string, method: string) {
    return this.http.get(`${this.baseExternalAPI + externo}/${method}`, {
      reportProgress: true,
      responseType: 'blob',
      observe: 'response',
    });
  }

  getFile(method: string) {
    return this.http.get(`${this.baseAPI}/${method}`, {
      reportProgress: true,
      responseType: 'blob',
      observe: 'response',
    });
  }

  postFileExterno<TValue>(externo: string, method: string, ObjEntidad: TValue) {
    return this.http.post(
      `${this.baseExternalAPI + externo}/${method}`,
      JSON.stringify(ObjEntidad),
      {
        reportProgress: true,
        responseType: 'blob',
        observe: 'response',
      }
    );
  }

  postFile<TValue>(method: string, ObjEntidad: TValue) {
    return this.http.post(
      `${this.baseAPI}/${method}`,
      JSON.stringify(ObjEntidad),
      {
        reportProgress: true,
        responseType: 'blob',
        observe: 'response',
      }
    );
  }
}
