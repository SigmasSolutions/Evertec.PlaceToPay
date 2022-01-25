import { Component, Input, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  NgbTimeStruct,
  NgbDateStruct,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker,
  NgbDatepickerI18n,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateTimeModel } from './date-time.model';
import { noop } from 'rxjs';
import { CustomDatepickerI18n, I18n } from 'src/app/app-core/core/config/custom-datepicker-i18n';
import { Utility } from '../../../app-core/core/utility';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    },
    I18n,
    {
      provide: NgbDatepickerI18n,
      useClass: CustomDatepickerI18n
    },
    NgbDatepickerConfig
  ]
})
export class DateTimePickerComponent implements ControlValueAccessor, AfterViewInit {
  @Input() dateString: string;
  @Input() onlyDate = false;
  @Input() inputDatetimeFormat: string;
  @Input() hourStep = 1;
  @Input() minuteStep = 15;
  @Input() secondStep = 30;
  @Input() seconds = true;
  @Input() disabled = false;
  @Input() meridian = false;
  @Input() maxDate: any;
  @Input() minDate: any;
  @Input() textPlaceHolder = 'Messages.DefaultSelectDate';

  showTimePickerToggle = false;

  datetime: DateTimeModel = new DateTimeModel();

  @ViewChild(NgbDatepicker, { static: false }) readonly dp: NgbDatepicker;

  @ViewChild(NgbPopover, { static: true }) readonly popover: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(readonly config: NgbPopoverConfig) {
    config.autoClose = 'outside';
    config.placement = 'auto';

    if (!this.inputDatetimeFormat) {
      this.inputDatetimeFormat = (this.onlyDate) ?
        Utility.DEFAULT_CONFIG_APP.DefaultDate :
        Utility.DEFAULT_CONFIG_APP.DefaultDateTime;
    }
  }

  ngAfterViewInit(): void {
    this.popover.hidden.subscribe(() => {
      this.showTimePickerToggle = false;
    });
  }

  getDate(fecha: string): DateTimeModel {
    if (fecha) {
      return DateTimeModel.fromLocalString(fecha);
    }

    return null;
  }

  deleteValue() {
    this.datetime = new DateTimeModel();
    this.dateString = null;
    this.onChange(null);
  }

  writeValue(newModel: string) {
    if (newModel) {
      this.datetime = Object.assign(this.datetime, DateTimeModel.fromLocalString(newModel));
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.dateString = null;
      this.datetime = new DateTimeModel();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange($event: any | NgbDateStruct) {
    const date = $event;

    if (!date) {
      return;
    }

    if (!this.datetime) {
      this.datetime = date;
    }

    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;

    if (!this.onlyDate) {
      this.showTimePickerToggle = !this.showTimePickerToggle;
    }

    this.setDateStringModel();
  }

  onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;

    this.setDateStringModel();
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();
    this.onChange(this.dateString);
  }

  inputBlur() {
    this.onTouched();
  }
}
