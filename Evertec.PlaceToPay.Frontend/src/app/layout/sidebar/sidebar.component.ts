import { Resource } from './../../app-core/core/objects/resource.object';
import { Component } from '@angular/core';
import * as data from 'src/data.menu.json';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  Menu: Resource[] = (data as any).default;

  constructor() {}
}
