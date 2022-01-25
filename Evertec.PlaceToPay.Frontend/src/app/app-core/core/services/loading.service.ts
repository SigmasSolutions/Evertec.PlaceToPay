import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private initLoading = 0;
    readonly loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() { }

    showLoading() {
        this.initLoading += 1;
        this.loading.next(true);
    }

    hideLoading() {
        this.initLoading -= 1;
        if (this.initLoading <= 0) {
            this.initLoading = 0;
            this.loading.next(false);
        }
    }

    getValue() {
        return this.loading;
    }
}
