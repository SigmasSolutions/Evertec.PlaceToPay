import { Component, Input } from '@angular/core';
import { SizeProp, RotateProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-iconapp',
  templateUrl: './icon-app.component.html'
})
export class IconAppComponent {
  @Input() icon: string;
  @Input() iconLib = 'fas';
  @Input() spin = false;
  @Input() pulse = false;

  @Input() size: SizeProp;
  @Input() rotate: RotateProp;
  @Input() contentText: string;
}
