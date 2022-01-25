import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbDatepickerModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbTimepickerModule,
  NgbTooltipModule,
  NgbButtonsModule,
} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

import { NgxSummernoteModule } from 'ngx-summernote';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgSelectModule, NgSelectConfig } from '@ng-select/ng-select';
import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import {
  IconComponent,
  LoadingComponent,
  ModalHeadComponent,
  ModalFooterComponent,
  NumberRecordsComponent,
  NoResultsComponent,
  PaginatorComponent,
  TableBtnComponent,
  TableThComponent,
  TitleHeadComponent,
  FilterColumnComponent,
  MessagesComponent,
  DateTimePickerComponent,
  ButtonGenericComponent,
  IconAppComponent,
  MenuModuleComponent
} from './components';

import {
  SortByPipe,
  FilterByPipe,
  FilterPipe,
  FileSizePipe
} from 'src/app/app-core/pipeTransform';

import {
  NumbersLettersDirective,
  NumbersDirective,
  SpeakDirective
} from 'src/app/app-core/directive';
import { PreTableComponent } from './components/pre-table/pre-table.component';

@NgModule({
  declarations: [
    IconComponent,
    LoadingComponent,
    ModalHeadComponent,
    ModalFooterComponent,
    NumberRecordsComponent,
    NoResultsComponent,
    PaginatorComponent,
    TableBtnComponent,
    TableThComponent,
    TitleHeadComponent,
    FilterColumnComponent,
    MessagesComponent,
    DateTimePickerComponent,
    ButtonGenericComponent,
    IconAppComponent,
    MenuModuleComponent,

    SortByPipe,
    FilterByPipe,
    FilterPipe,
    FileSizePipe,

    NumbersLettersDirective,
    NumbersDirective,
    SpeakDirective,
    PreTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPaginationModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbButtonsModule,

    HttpClientModule,
    MatSortModule,
    MatMenuModule,
    SweetAlert2Module,
    TranslateModule,
    NgxSummernoteModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    FontAwesomeModule,
    NgSelectModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,

    NgbModalModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbTooltipModule,
    NgbButtonsModule,

    SweetAlert2Module,
    NgbPopoverModule,
    HttpClientModule,
    NgxSummernoteModule,
    MatSortModule,
    MatMenuModule,
    FontAwesomeModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    NgSelectModule,
    TranslateModule,

    IconComponent,
    LoadingComponent,
    ModalHeadComponent,
    ModalFooterComponent,
    NumberRecordsComponent,
    NoResultsComponent,
    PaginatorComponent,
    TableBtnComponent,
    TableThComponent,
    TitleHeadComponent,
    FilterColumnComponent,
    MessagesComponent,
    DateTimePickerComponent,
    ButtonGenericComponent,
    IconAppComponent,
    MenuModuleComponent,
    PreTableComponent,

    SortByPipe,
    FilterByPipe,
    FilterPipe,
    FileSizePipe,

    NumbersLettersDirective,
    NumbersDirective,
    SpeakDirective,
  ],
})
export class SharedModule {
  constructor(
    private library: FaIconLibrary,
    private config: NgSelectConfig,
    readonly translate: TranslateService
  ) {
    // Add an icon to the library for convenient access in other components
    this.library.addIconPacks(fas, fab, far);

    if (this.translate) {
      this.translate
        .get(['Generic.ItemDefaultCombo', 'Generic.ItemDefaultSinDatos'])
        .subscribe((res: any) => {
          this.config.notFoundText = res['Generic.ItemDefaultSinDatos'];
          this.config.placeholder = res['Generic.ItemDefaultCombo'];
        });
    }
  }
}
