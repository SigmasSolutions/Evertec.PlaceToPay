import { MessageService } from './../../../app-core/core/services/message.service';
import { environment } from '@env/environment';
import { Component, OnDestroy } from '@angular/core';
import { LocationService } from '@appcore/services/location.service';
import $ from 'jquery';
import { Utility } from '@appcore/utility';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnDestroy {
  latitudeActual: number;
  longitudeActual: number;
  latitude: number;
  longitude: number;

  typesTankSelect: number[] = [];
  inputDatetimeFormat = Utility.DEFAULT_CONFIG_APP.DefaultDateTime;
  colorDefaultApp = Utility.DEFAULT_CONFIG_APP.DefaultColor;

  constructor(
    private readonly locationService: LocationService,
    readonly messageService: MessageService
  ) {
  }

  ngOnDestroy(): void {
  }

  toggle($event: any): void {
    $event.preventDefault();
    const sidenav = $('#sideBarToggle');
    const parentSideBar = sidenav.parents('.cuore-sidebar');
    if (sidenav.parents('.cuore--closed').length) {
      parentSideBar.removeClass('cuore--closed');
      if (window.matchMedia('(max-width: 767px)').matches) {
        parentSideBar.addClass('col-sm-6');
      } else {
        parentSideBar.addClass('col-md-3');
      }
    } else {
      parentSideBar.addClass('cuore--closed');
      parentSideBar.removeClass((index, css) => {
        return (css.match(/\bcol\S+/g) || []).join(' '); // removes anything that starts with 'itemnx'
      });
    }
  }
}
