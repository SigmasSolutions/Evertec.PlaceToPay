import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Utility } from '../core/utility';
import { SpeakService } from '../core/services/speak.service';

@Directive({
    selector: '[appSpeak]'
})
export class SpeakDirective implements OnInit {
    mouseover: boolean;
    speech: any;
    activeSpeak = true;

    constructor(readonly elementRef: ElementRef, readonly speakService: SpeakService) { }

    ngOnInit(): void {
        this.speakService.getActiveSpeak().subscribe((active) => {
            this.activeSpeak = active;
        });
    }

    @HostListener('mouseover')
    onMouseOver() {
        if (this.activeSpeak) {
            const text = this.elementRef.nativeElement.textContent;
            if (text) {
                this.speech = Utility.SpeechPage(text);
                this.mouseover = true;
            }
        }
    }

    @HostListener('mouseout')
    onMouseOut() {
        if (this.activeSpeak) {
            this.speech?.cancel();
            this.mouseover = false;
        }
    }
}
