import { Component, Input, Output, EventEmitter, HostListener, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  template: `
    <!-- Backdrop -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      [@modalAnimation]
      (click)="closeOnBackdropClick && close()"
    ></div>

    <!-- Modal -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-10 overflow-y-auto"
      [@modalAnimation]
      (click)="closeOnBackdropClick && close()"
    >
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          [class]="modalClasses"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div *ngIf="title" class="flex items-start justify-between p-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <button
              *ngIf="showCloseButton"
              type="button"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
              (click)="close()"
            >
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-4">
            <ng-content></ng-content>
          </div>

          <!-- Footer -->
          <div *ngIf="showFooter" class="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
            <ng-content select="[modalFooter]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showCloseButton = true;
  @Input() showFooter = true;
  @Input() closeOnBackdropClick = true;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen) {
      this.close();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  close() {
    this.closed.emit();
  }

  get modalClasses(): string {
    const baseClasses = 'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl';
    const sizeClasses = {
      sm: 'sm:max-w-sm sm:w-full',
      md: 'sm:max-w-md sm:w-full',
      lg: 'sm:max-w-lg sm:w-full',
      xl: 'sm:max-w-xl sm:w-full'
    };
    return `${baseClasses} ${sizeClasses[this.size]}`;
  }
}
