import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpeakService {

    readonly active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    activeSpeak() {
        this.active.next(true);
    }

    inactivateSpeak() {
        this.active.next(false);
    }

    getActiveSpeak() {
        return this.active;
    }
}
