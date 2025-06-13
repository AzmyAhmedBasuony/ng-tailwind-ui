import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownItem {
  label?: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left" #dropdownContainer>
      <!-- Trigger Button -->
      <button
        type="button"
        [class]="triggerClasses"
        (click)="toggleDropdown($event)"
        [attr.aria-expanded]="isOpen"
        aria-haspopup="true"
      >
        <ng-content select="[dropdownTrigger]"></ng-content>
      </button>

      <!-- Dropdown Menu -->
      <div
        *ngIf="isOpen"
        [class]="menuClasses"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <ng-container *ngFor="let item of items">
            <!-- Divider -->
            <div *ngIf="item.divider" class="border-t border-gray-100 my-1"></div>

            <!-- Menu Item -->
            <button
              *ngIf="!item.divider"
              [class]="getItemClasses(item)"
              [disabled]="item.disabled"
              (click)="handleItemClick(item, $event)"
              role="menuitem"
              tabindex="-1"
            >
              <!-- Icon if present -->
              <svg
                *ngIf="item.icon"
                [class]="iconClasses"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path [attr.d]="item.icon" />
              </svg>
              {{ item.label }}
            </button>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Input() triggerVariant: 'default' | 'primary' | 'ghost' = 'default';
  @Input() menuPosition: 'left' | 'right' = 'right';
  @Input() menuWidth: 'sm' | 'md' | 'lg' = 'md';
  @Output() itemSelected = new EventEmitter<DropdownItem>();

  isOpen = false;
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen && !this.dropdownContainer?.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.cdr.detectChanges();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen) {
      this.isOpen = false;
      this.cdr.detectChanges();
    }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    this.cdr.detectChanges();
  }

  handleItemClick(item: DropdownItem, event: MouseEvent) {
    event.stopPropagation();

    if (item.disabled) return;

    if (item.onClick) {
      item.onClick();
    }
    this.itemSelected.emit(item);
    this.isOpen = false;
    this.cdr.detectChanges();
  }

  get triggerClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2';
    const variantClasses = {
      default: 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 border border-gray-300',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
    };
    return `${baseClasses} ${variantClasses[this.triggerVariant]}`;
  }

  get menuClasses(): string {
    const baseClasses = 'absolute z-50 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none';
    const positionClasses = {
      left: 'left-0',
      right: 'right-0'
    };
    const widthClasses = {
      sm: 'w-48',
      md: 'w-56',
      lg: 'w-64'
    };
    return `${baseClasses} ${positionClasses[this.menuPosition]} ${widthClasses[this.menuWidth]}`;
  }

  getItemClasses(item: DropdownItem): string {
    const baseClasses = 'w-full text-left px-4 py-2 text-sm flex items-center';
    const stateClasses = item.disabled
      ? 'text-gray-400 cursor-not-allowed'
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer';
    return `${baseClasses} ${stateClasses}`;
  }

  get iconClasses(): string {
    return 'mr-3 h-5 w-5 text-gray-400';
  }
}
