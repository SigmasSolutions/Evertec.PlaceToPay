import { Utility } from '@appcore/utility';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';
import { MessageService } from '@appcore/services/message.service';
import { BaseGenericService } from '@appcore/services/base-generic.services';
import { Filters } from '@appcore/objects/filter.object';
import { BaseComponent } from '@appcore/base.component';
import { HttpResponse } from '@angular/common/http';

export class BaseListComponent<T> extends BaseComponent<T> {
  defaultPage = Utility.DEFAULT_CONFIG_APP.DEFAULT_PAGE;
  numberRecords = Utility.DEFAULT_CONFIG_APP.DEFAULT_NUMBERRECORDS;
  defaultStyleTable = Utility.DEFAULT_CONFIG_APP.DefaultStyleTable;

  page = this.defaultPage;
  sort: Sort;
  filters: Filters;

  $ListOrdered: any;
  $Modal: any;

  constructor(
    readonly serviceEntidad: BaseGenericService<T>,
    readonly modalService: NgbModal,
    readonly messageService: MessageService
  ) {
    super(serviceEntidad, messageService);
    this.serviceEntidad.refeshList = false;

    this.$onMethod = (): void => {
      this.pageData(this.defaultPage);
    };
  }

  updateData(): void {
    this.listEntidad(true);
  }

  exportData(): void {
    this.serviceEntidad
      .getFile('ExportExcelData')
      .subscribe((value: HttpResponse<Blob>) => {
        Utility.downloadFile(value, this.serviceEntidad.nameAPI);
      });
  }

  sortData(sort: Sort): void {
    this.sort = sort;
    this.listEntidad();
  }

  filterData(filter: Filters): void {
    this.filters = filter;
    this.page = this.defaultPage;
    this.listEntidad();
  }

  pageData(page: number): void {
    this.page = page;
    this.listEntidad();
  }

  numberRecordsData(numberRecord: number): void {
    this.numberRecords = numberRecord;
    this.page = this.defaultPage;
    this.listEntidad();
  }

  private listEntidad(refresh = false): void {
    if (this.$ListOrdered) {
      this.serviceEntidad.refeshList = refresh;
      this.$ListOrdered();
    }
  }

  openModal(objEntidad?: T, isView?: boolean): void {
    if (this.$Modal) {
      const modalRef = this.modalService.open(this.$Modal, {
        size: 'lg',
        backdrop: 'static'
      });

      if (objEntidad) {
        modalRef.componentInstance.isUpdate = true;
        modalRef.componentInstance.isView = isView ? isView : false;
        modalRef.componentInstance.Init(objEntidad);
      }
      modalRef.result
        .then(() => {
          this.pageData(this.defaultPage);
        })
        .catch(() => {});
    }
  }
}
