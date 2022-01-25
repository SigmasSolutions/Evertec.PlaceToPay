import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@appcore/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit {
  @Input() loading = false;

  constructor(readonly loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.getValue().subscribe((loading) => {
      setTimeout(() => (this.loading = loading), 100);
    });
  }
}
