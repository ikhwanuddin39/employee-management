import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyIdr',
  standalone: true
})
export class CurrencyIdrPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') return '';
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) return '';

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(numericValue).replace('IDR', 'Rp.');
  }
}
