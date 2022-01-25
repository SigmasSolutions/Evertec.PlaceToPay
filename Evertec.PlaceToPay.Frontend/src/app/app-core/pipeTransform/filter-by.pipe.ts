import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy',
    pure: false
})
export class FilterByPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any {
        if (!items) { return []; }
        if ((!value || value.length === 0) && value !== undefined) { return items; }

        if (typeof value === 'number') {
            return items.filter(it => it[field] === value);
        } else {
            if (value === 'null') {
                return items.filter(it => it[field] === null);
            }

            if (value === undefined) {
                return items.filter(it => it[field] === undefined);
            }

            return items.filter(it =>
                it[field].toLowerCase().indexOf(value.toLowerCase()) !== -1);
        }
    }
}
