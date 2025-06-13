import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener, forwardRef, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full">
      <!-- Label -->
      <label *ngIf="label" [for]="id" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>

      <!-- Select Container -->
      <div class="relative">
        <!-- Select Button -->
        <button
          #selectButton
          type="button"
          [id]="id"
          [class]="getButtonClasses()"
          (click)="toggleDropdown()"
          [disabled]="disabled"
          [attr.aria-expanded]="isOpen"
          [attr.aria-haspopup]="'listbox'"
          [attr.aria-labelledby]="id + '-label'"
        >
          <!-- Selected Value(s) -->
          <div class="flex flex-wrap gap-1 min-h-[1.5rem]">
            <ng-container *ngIf="multiple">
              <div
                *ngFor="let option of selectedOptions"
                class="inline-flex items-center px-2 py-0.5 rounded text-sm bg-primary-100 text-primary-800"
              >
                <span>{{ option.label }}</span>
                <button
                  type="button"
                  class="ml-1 text-primary-600 hover:text-primary-800"
                  (click)="removeOption(option); $event.stopPropagation()"
                >
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <span *ngIf="selectedOptions.length === 0" class="text-gray-500">
                {{ placeholder || 'Select options' }}
              </span>
            </ng-container>
            <ng-container *ngIf="!multiple">
              <span class="block truncate">
                {{ selectedOption?.label || placeholder || 'Select an option' }}
              </span>
            </ng-container>
          </div>

          <!-- Dropdown Icon -->
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        <!-- Dropdown Menu -->
        <div
          *ngIf="isOpen"
          [@dropdownAnimation]
          class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
          role="listbox"
        >
          <ul
            class="max-h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabindex="-1"
          >
            <!-- Search Input (if searchable) -->
            <li *ngIf="searchable" class="px-3 py-2 sticky top-0 bg-white border-b" (click)="$event.stopPropagation()">
              <input
                type="text"
                [placeholder]="'Search...'"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                (click)="$event.stopPropagation()"
                class="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </li>

            <!-- Options -->
            <li
              *ngFor="let option of filteredOptions"
              [class]="getOptionClasses(option)"
              role="option"
              [attr.aria-selected]="isOptionSelected(option)"
              (click)="selectOption(option)"
            >
              <!-- Option Icon -->
              <div *ngIf="option.icon" class="flex-shrink-0 h-5 w-5 text-gray-400">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path [attr.d]="option.icon" />
                </svg>
              </div>

              <!-- Option Content -->
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-gray-900">{{ option.label }}</div>
                <div *ngIf="option.description" class="text-sm text-gray-500">
                  {{ option.description }}
                </div>
              </div>

              <!-- Selected Checkmark -->
              <div *ngIf="isOptionSelected(option)" class="flex-shrink-0 h-5 w-5 text-primary-600">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </li>

            <!-- No Results -->
            <li *ngIf="filteredOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
              No options found
            </li>
          </ul>
        </div>
      </div>

      <!-- Error Message -->
      <p *ngIf="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

      <!-- Hint Text -->
      <p *ngIf="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
  `,
  animations: [
    trigger('dropdownAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.95) translateY(-10px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      transition('void => *', animate('150ms ease-out')),
      transition('* => void', animate('100ms ease-in'))
    ])
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class SelectComponent implements ControlValueAccessor, OnChanges {
  @ViewChild('selectButton') selectButton!: ElementRef;

  @Input() id = 'select-' + Math.random().toString(36).substr(2, 9);
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: SelectOption[] = [];
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() error = '';
  @Input() hint = '';
  @Input() searchable = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() selectionChange = new EventEmitter<any>();

  isOpen = false;
  searchQuery = '';
  selectedOption: SelectOption | null = null;
  selectedOptions: SelectOption[] = [];
  filteredOptions: SelectOption[] = [];

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.filteredOptions = [...this.options];
  }

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.filteredOptions = [...this.options];
      // Update selected options if they exist in the new options
      if (this.multiple) {
        this.selectedOptions = this.selectedOptions.filter(option =>
          this.options.some(o => o.value === option.value)
        );
      } else if (this.selectedOption && !this.options.some(o => o.value === this.selectedOption?.value)) {
        this.selectedOption = null;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.selectButton?.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('keydown.escape')
  onEscapeKey() {
    this.isOpen = false;
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouched();
      }
    }
  }

  selectOption(option: SelectOption) {
    if (option.disabled) return;

    if (this.multiple) {
      const index = this.selectedOptions.findIndex(o => o.value === option.value);
      if (index === -1) {
        this.selectedOptions.push(option);
      } else {
        this.selectedOptions.splice(index, 1);
      }
      this.onChange(this.selectedOptions.map(o => o.value));
      this.selectionChange.emit(this.selectedOptions.map(o => o.value));
    } else {
      this.selectedOption = option;
      this.onChange(option.value);
      this.selectionChange.emit(option.value);
      this.isOpen = false;
    }
  }

  removeOption(option: SelectOption) {
    if (this.multiple) {
      this.selectedOptions = this.selectedOptions.filter(o => o.value !== option.value);
      this.onChange(this.selectedOptions.map(o => o.value));
      this.selectionChange.emit(this.selectedOptions.map(o => o.value));
    }
  }

  isOptionSelected(option: SelectOption): boolean {
    if (this.multiple) {
      return this.selectedOptions.some(o => o.value === option.value);
    }
    return this.selectedOption?.value === option.value;
  }

  onSearch() {
    if (!this.searchQuery) {
      this.filteredOptions = [...this.options];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(query) ||
        (option.description?.toLowerCase().includes(query))
      );
    }
  }

  getButtonClasses(): string {
    const baseClasses = `
      relative w-full cursor-default rounded-md border
      ${this.disabled ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'}
      ${this.error ? 'border-red-300' : 'border-gray-300'}
      ${this.size === 'sm' ? 'py-1.5 pl-3 pr-10 text-sm' : this.size === 'lg' ? 'py-3 pl-4 pr-10 text-base' : 'py-2 pl-3 pr-10 text-sm'}
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    `;

    return baseClasses;
  }

  getOptionClasses(option: SelectOption): string {
    return `
      relative flex items-center px-3 py-2 cursor-pointer select-none
      ${option.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:bg-primary-50'}
      ${this.isOptionSelected(option) ? 'bg-primary-50' : ''}
    `;
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedOptions = this.options.filter(option => value?.includes(option.value));
    } else {
      this.selectedOption = this.options.find(option => option.value === value) || null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
