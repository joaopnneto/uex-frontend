import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMasks]'
})
export class MasksDirective {
  @Input('appMasks') maskType: string = '';

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (this.maskType === 'cpf') {
      this.el.nativeElement.value = this.cpf(value);
    } else if (this.maskType === 'phone') {
      this.el.nativeElement.value = this.phone(value);
    } else if (this.maskType === 'zip_code') {
      this.el.nativeElement.value = this.cep(value);
    }
  }

  private cpf(value: string): string {
    const cleanedValue = value.replace(/\D/g, '');

    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private phone(value: string): string {
    const cleanedValue = value.replace(/\D/g, '');

    return cleanedValue.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }

  private cep(value: string): string {
    const cleanedValue = value.replace(/\D/g, '');

    return cleanedValue.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}