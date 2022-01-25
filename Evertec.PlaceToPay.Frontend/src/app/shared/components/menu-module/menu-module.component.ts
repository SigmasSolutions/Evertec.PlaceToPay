import { Resource } from '@appcore/objects/resource.object';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-module',
  templateUrl: './menu-module.component.html',
  styleUrls: ['./menu-module.component.scss']
})
export class MenuModuleComponent {
  @Input() menuList: Resource[];
  @Input() Menu: Resource[];
}
