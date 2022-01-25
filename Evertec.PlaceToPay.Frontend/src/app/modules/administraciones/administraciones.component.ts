import { Resource } from '@appcore/objects/resource.object';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as data from 'src/data.menu.json';

@Component({
  selector: 'app-modulo-administraciones',
  templateUrl: './administraciones.component.html'
})
export class AdministracionesComponent implements OnInit {
  menuList: Resource[] = (data as any).default;
  Menu: Resource[];

  constructor(readonly router: Router) { }

  ngOnInit() {
    const urlPadre = this.router.routerState.snapshot.url;
    this.Menu = this.menuList.filter((menu: Resource) => {
      return menu.url === urlPadre;
    });
  }
}
