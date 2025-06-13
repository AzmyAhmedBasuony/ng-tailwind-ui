import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2">
      <div
        *ngFor="let item of items"
        [class]="getItemClasses(item)"
        [attr.aria-expanded]="isOpen(item.id)"
      >
        <!-- Accordion Header -->
        <button
          [id]="'accordion-' + item.id"
          [class]="getButtonClasses(item)"
          [disabled]="item.disabled"
          (click)="toggleItem(item.id)"
          type="button"
        >
          <div class="flex items-center">
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
            <span class="text-left">{{ item.title }}</span>
          </div>
          <!-- Chevron Icon -->
          <svg
            [class]="getChevronClasses(item.id)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Accordion Content -->
        <div
          [id]="'accordion-content-' + item.id"
          [class]="getContentClasses(item.id)"
          role="region"
          [attr.aria-labelledby]="'accordion-' + item.id"
        >
          <div class="px-4 py-3">
            <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: item }">
            </ng-container>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Template -->
    <ng-template #contentTemplate let-item>
      {{ item.content }}
    </ng-template>
  `,
  styles: []
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() variant: 'default' | 'bordered' | 'separated' = 'default';
  @Input() multiple = false;
  @Output() itemToggle = new EventEmitter<{ id: string; isOpen: boolean }>();

  private openItems: Set<string> = new Set();

  isOpen(itemId: string): boolean {
    return this.openItems.has(itemId);
  }

  toggleItem(itemId: string) {
    const item = this.items.find(i => i.id === itemId);
    if (item?.disabled) return;

    if (this.multiple) {
      if (this.openItems.has(itemId)) {
        this.openItems.delete(itemId);
      } else {
        this.openItems.add(itemId);
      }
    } else {
      this.openItems.clear();
      if (!this.openItems.has(itemId)) {
        this.openItems.add(itemId);
      }
    }

    this.itemToggle.emit({ id: itemId, isOpen: this.isOpen(itemId) });
  }

  getItemClasses(item: AccordionItem): string {
    const baseClasses = 'overflow-hidden transition-all duration-200';
    const variantClasses = {
      default: 'bg-white rounded-lg shadow',
      bordered: 'border border-gray-200 rounded-lg',
      separated: 'border-b border-gray-200 last:border-b-0'
    };
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  getButtonClasses(item: AccordionItem): string {
    const baseClasses = 'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
    const variantClasses = {
      default: 'hover:bg-gray-50',
      bordered: 'hover:bg-gray-50',
      separated: 'hover:bg-gray-50'
    };
    const disabledClass = item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    return `${baseClasses} ${variantClasses[this.variant]} ${disabledClass}`;
  }

  getContentClasses(itemId: string): string {
    const baseClasses = 'transition-all duration-200 ease-in-out';
    const heightClass = this.isOpen(itemId) ? 'max-h-96' : 'max-h-0';
    return `${baseClasses} ${heightClass}`;
  }

  getChevronClasses(itemId: string): string {
    const baseClasses = 'h-5 w-5 text-gray-400 transition-transform duration-200';
    const rotateClass = this.isOpen(itemId) ? 'transform rotate-180' : '';
    return `${baseClasses} ${rotateClass}`;
  }

  get iconClasses(): string {
    return 'mr-3 h-5 w-5 text-gray-400';
  }
}
