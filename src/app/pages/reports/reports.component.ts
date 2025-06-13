import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SelectComponent } from '../../shared/components/select/select.component';

type ReportStatus = 'completed' | 'pending' | 'cancelled';

interface ReportData {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: ReportStatus;
}

interface SearchCriteria {
  startDate: string;
  endDate: string;
  category: string;
  status: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent, CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <!-- Search Criteria -->
    <app-card class="mb-6 bg-white shadow-sm border border-gray-100 relative">
      <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Search Criteria</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Date Range</label>
            <div class="flex space-x-2">
              <div class="flex-1">
                <input
                  type="date"
                  [(ngModel)]="searchCriteria.startDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Start Date">
              </div>
              <div class="flex-1">
                <input
                  type="date"
                  [(ngModel)]="searchCriteria.endDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="End Date">
              </div>
            </div>
          </div>
          <div class="space-y-2 relative">
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <div class="relative z-50">
              <app-select
                [(ngModel)]="searchCriteria.category"
                [options]="categories"
                placeholder="Select category"
                [searchable]="true"
                class="w-full">
              </app-select>
            </div>
          </div>
          <div class="space-y-2 relative">
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <div class="relative z-50">
              <app-select
                [(ngModel)]="searchCriteria.status"
                [options]="statuses"
                placeholder="Select status"
                [searchable]="true"
                class="w-full">
              </app-select>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <app-button
            (click)="resetSearch()"
            variant="secondary"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg class="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </app-button>
          <app-button
            (click)="search()"
            variant="primary"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg class="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </app-button>
        </div>
      </div>
    </app-card>

    <!-- Results -->
    <app-card class="bg-white shadow-sm border border-gray-100">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Report Results</h2>
            <p class="mt-1 text-sm text-gray-500">Showing {{ filteredData.length }} records</p>
          </div>
          <app-button
            (click)="printReport()"
            variant="primary"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg class="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Report
          </app-button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th *ngFor="let header of tableHeaders"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let item of filteredData" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.date | date:'short' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.category }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ item.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                  {{ item.amount | currency }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span [class]="'px-3 py-1 rounded-full text-xs font-medium ' + getStatusClass(item.status)">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </app-card>

    <!-- Hidden iframe for printing -->
    <iframe #printFrame style="display: none;"></iframe>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Ensure select dropdowns appear above other content */
    :host ::ng-deep app-select {
      position: relative;
    }

    :host ::ng-deep app-select .select-dropdown {
      position: absolute;
      z-index: 50;
      width: 100%;
      margin-top: 4px;
      background-color: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    :host ::ng-deep app-select .select-option {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
    }

    :host ::ng-deep app-select .select-option:hover {
      background-color: #f3f4f6;
    }

    :host ::ng-deep app-select .select-option.selected {
      background-color: #e5e7eb;
    }

    /* Print styles */
    @media print {
      /* Hide everything except the iframe */
      :host > *:not(iframe) {
        display: none !important;
      }
    }
  `]
})
export class ReportsComponent implements OnInit {
  @ViewChild('printFrame') printFrame!: ElementRef<HTMLIFrameElement>;

  searchCriteria = {
    startDate: '',
    endDate: '',
    category: '',
    status: ''
  };

  categories = [
    { value: 'sales', label: 'Sales' },
    { value: 'expenses', label: 'Expenses' },
    { value: 'income', label: 'Income' },
    { value: 'refunds', label: 'Refunds' }
  ];

  statuses = [
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  tableHeaders = ['ID', 'Date', 'Category', 'Description', 'Amount', 'Status'];

  // Sample data - replace with actual API call
  private data: ReportData[] = [
    { id: 1, date: '2024-03-15', category: 'sales', description: 'Monthly sales report', amount: 15000, status: 'completed' },
    { id: 2, date: '2024-03-14', category: 'expenses', description: 'Office supplies', amount: 2500, status: 'pending' },
    { id: 3, date: '2024-03-13', category: 'inventory', description: 'Stock update', amount: 8000, status: 'completed' },
    { id: 4, date: '2024-03-12', category: 'payroll', description: 'Employee salaries', amount: 45000, status: 'completed' },
    { id: 5, date: '2024-03-11', category: 'sales', description: 'Quarterly sales review', amount: 25000, status: 'cancelled' }
  ];

  filteredData: ReportData[] = [];

  ngOnInit(): void {
    this.filteredData = [...this.data];
  }

  getStatusClass(status: ReportStatus): string {
    const baseClass = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    switch (status) {
      case 'completed':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClass} bg-red-100 text-red-800`;
      default:
        return baseClass;
    }
  }

  search(): void {
    this.filteredData = this.data.filter((item: ReportData) => {
      const matchesDate = (!this.searchCriteria.startDate || item.date >= this.searchCriteria.startDate) &&
                         (!this.searchCriteria.endDate || item.date <= this.searchCriteria.endDate);
      const matchesCategory = !this.searchCriteria.category || item.category === this.searchCriteria.category;
      const matchesStatus = !this.searchCriteria.status || item.status === this.searchCriteria.status;

      return matchesDate && matchesCategory && matchesStatus;
    });
  }

  resetSearch(): void {
    this.searchCriteria = {
      startDate: '',
      endDate: '',
      category: '',
      status: ''
    };
    this.filteredData = [...this.data];
  }

  printReport(): void {
    const iframe = this.printFrame.nativeElement;
    const doc = iframe.contentWindow?.document;

    if (doc) {
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 0;
              padding: 0;
              font-size: 12px;
            }
            th, td {
              border: 1px solid #e5e7eb;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f9fafb;
              font-weight: 600;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #374151;
            }
            td {
              color: #1f2937;
            }
            td:nth-child(5) {
              text-align: right;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 500;
              text-align: center;
              min-width: 80px;
            }
            .bg-green-100 { background-color: #d1fae5; }
            .text-green-800 { color: #065f46; }
            .bg-yellow-100 { background-color: #fef3c7; }
            .text-yellow-800 { color: #92400e; }
            .bg-red-100 { background-color: #fee2e2; }
            .text-red-800 { color: #991b1b; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .text-gray-800 { color: #1f2937; }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            @page {
              margin: 1cm;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${this.tableHeaders.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${this.filteredData.map(item => `
                <tr>
                  <td>${item.id}</td>
                  <td>${new Date(item.date).toLocaleString()}</td>
                  <td>${item.category}</td>
                  <td>${item.description}</td>
                  <td>$${item.amount.toFixed(2)}</td>
                  <td>
                    <span class="status-badge ${this.getStatusClass(item.status)}">
                      ${item.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      doc.open();
      doc.write(printContent);
      doc.close();

      iframe.contentWindow?.print();
    }
  }
}
