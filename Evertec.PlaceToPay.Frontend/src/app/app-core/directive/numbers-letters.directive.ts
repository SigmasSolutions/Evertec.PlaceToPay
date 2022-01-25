import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumbersLettersOnly]'
})
export class NumbersLettersDirective {
    constructor(readonly elementRef: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        this.validateValue(event);
    }

    @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
        this.validateValue(event);
    }

    validateValue(event: any) {
        const initalValue = this.elementRef.nativeElement.value;
        this.elementRef.nativeElement.value = initalValue.replace(/^\s+/g, '').replace(/[^\sa-zA-Z0-9ñÑáéíóúÁÉÍÓÚ/-]*/g, '');
        if (initalValue !== this.elementRef.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
