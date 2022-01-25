import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Filters } from '../../../app-core/core/objects/filter.object';

@Component({
    selector: 'app-filter-column',
    templateUrl: './filter-column.component.html',
    styleUrls: ['./filter-column.component.scss']
})
export class FilterColumnComponent {
    @Input() titleName: string;
    @Input() columnFilter: string;
    @Input() typeFilter = 'string';
    @Output() eventChangeFilter = new EventEmitter();

    selectedFilter: [];

    crearObjetoFiltro(objFilters: Filters): Filters {
        return objFilters;
    }

    popUpChange(): void {
        if (this.selectedFilter != null) {
            if (this.typeFilter === 'bool') {
                this.eventChangeFilter.emit(this.crearObjetoFiltro({ name: this.columnFilter, values: [this.selectedFilter] }));
            } else if (this.selectedFilter.length > 0) {
                this.eventChangeFilter.emit(this.crearObjetoFiltro({ name: this.columnFilter, values: this.selectedFilter }));
            } else {
                this.eventChangeFilter.emit(null);
            }
        } else {
            this.eventChangeFilter.emit(null);
        }
    }
}
