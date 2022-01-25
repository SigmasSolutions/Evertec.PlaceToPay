import { Component, Input } from '@angular/core';
import { Utility } from '../../../app-core/core/utility';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styles: [`
    app-iconapp {
      font-size: 20px;
    }
  `]
})
export class IconComponent {
  @Input() showIcon: boolean;

  @Input() iconCheck = Utility.DEFAULT_CONFIG_APP.Icon.Check;
  @Input() iconUnCheck = Utility.DEFAULT_CONFIG_APP.Icon.UnCheck;
}
