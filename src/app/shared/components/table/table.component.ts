import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col">
      <!-- Search/Filter -->
      <div *ngIf="showSearch" class="mb-4">
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearch()"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                *ngFor="let column of columns"
                [class]="getHeaderClasses(column)"
                [style.width]="column.width"
                (click)="column.sortable && onSort(column.key)"
              >
                <div class="flex items-center space-x-1">
                  <span>{{ column.label }}</span>
                  <ng-container *ngIf="column.sortable">
                    <svg
                      *ngIf="sort?.column === column.key && sort?.direction === 'asc'"
                      class="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    <svg
                      *ngIf="sort?.column === column.key && sort?.direction === 'desc'"
                      class="h-5 w-5 text-gray-400 transform rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </ng-container>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let item of paginatedData" [class]="getRowClasses(item)">
              <td *ngFor="let column of columns" [class]="getCellClasses(column)">
                <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                </ng-container>
              </td>
            </tr>
            <tr *ngIf="paginatedData.length === 0">
              <td [attr.colspan]="columns.length" class="px-6 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div *ngIf="showPagination" class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div class="flex items-center">
          <select
            [(ngModel)]="pageSize"
            (ngModelChange)="onPageSizeChange()"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option [value]="5">5 per page</option>
            <option [value]="10">10 per page</option>
            <option [value]="20">20 per page</option>
            <option [value]="50">50 per page</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <button
            [disabled]="currentPage === 1"
            (click)="onPageChange(currentPage - 1)"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            [disabled]="currentPage === totalPages"
            (click)="onPageChange(currentPage + 1)"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Cell Template -->
    <ng-template #cellTemplate let-item let-column="column">
      {{ item[column.key] }}
    </ng-template>
  `,
  styles: []
})
export class TableComponent implements AfterContentInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showSearch = true;
  @Input() showPagination = true;
  @Input() pageSize = 10;
  @Input() striped = true;
  @Input() hoverable = true;
  @Output() sortChange = new EventEmitter<TableSort>();
  @Output() rowClick = new EventEmitter<any>();

  currentPage = 1;
  searchTerm = '';
  sort?: TableSort;
  filteredData: any[] = [];
  paginatedData: any[] = [];

  ngAfterContentInit() {
    this.updateTable();
  }

  onSort(column: string) {
    if (this.sort?.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort = { column, direction: 'asc' };
    }
    this.sortChange.emit(this.sort);
    this.updateTable();
  }

  onSearch() {
    this.currentPage = 1;
    this.updateTable();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateTable();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updateTable();
  }

  private updateTable() {
    // Apply search
    this.filteredData = this.data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );

    // Apply sorting
    if (this.sort) {
      this.filteredData.sort((a, b) => {
        const aValue = a[this.sort!.column];
        const bValue = b[this.sort!.column];
        const modifier = this.sort!.direction === 'asc' ? 1 : -1;
        return aValue > bValue ? modifier : -modifier;
      });
    }

    // Apply pagination
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  getHeaderClasses(column: TableColumn): string {
    const baseClasses = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
    const sortableClass = column.sortable ? 'cursor-pointer hover:bg-gray-100' : '';
    return `${baseClasses} ${sortableClass}`;
  }

  getRowClasses(item: any): string {
    const baseClasses = 'hover:bg-gray-50 cursor-pointer';
    const stripedClass = this.striped ? 'even:bg-gray-50' : '';
    return `${baseClasses} ${stripedClass}`;
  }

  getCellClasses(column: TableColumn): string {
    return 'px-6 py-4 whitespace-nowrap text-sm text-gray-500';
  }
}
