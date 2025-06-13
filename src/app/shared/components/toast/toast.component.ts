import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export type ToastInput = Omit<Toast, 'id'>;

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div
      [class]="containerClasses"
      role="alert"
      aria-live="assertive"
    >
      <div class="flex flex-col gap-2" style="margin-top: 4rem;">
        <div
          *ngFor="let toast of toasts"
          [class]="getToastClasses(toast)"
          [@toastAnimation]
          (@toastAnimation.done)="onAnimationComplete(toast)"
        >
          <div class="flex p-4">
            <!-- Icon -->
            <div [class]="getIconWrapperClasses(toast)">
              <svg
                [class]="getIconClasses(toast)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path [attr.d]="getIconPath(toast)" />
              </svg>
            </div>

            <!-- Content -->
            <div class="ml-3 flex-1">
              <p *ngIf="toast.title" [class]="getTitleClasses(toast)">
                {{ toast.title }}
              </p>
              <p [class]="getMessageClasses(toast)">
                {{ toast.message }}
              </p>
            </div>

            <!-- Close Button -->
            <div class="ml-4 flex-shrink-0">
              <button
                type="button"
                [class]="getCloseButtonClasses(toast)"
                (click)="removeToast(toast.id)"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      z-index: 50;
      pointer-events: none;
      width: 100%;
      margin-top: 2rem;
      max-width: 24rem;
    }
  `]
})
export class ToastComponent implements OnDestroy {
  @Input() position: ToastPosition = 'top-right';
  @Input() set toasts(value: Toast[]) {
    this._toasts = value;
    // Set up timeouts for new toasts
    value.forEach(toast => {
      if (!this.timeouts.has(toast.id) && toast.duration && toast.duration > 0) {
        const timeout = setTimeout(() => {
          this.removeToast(toast.id);
          this.cdr.detectChanges();
        }, toast.duration);
        this.timeouts.set(toast.id, timeout);
      }
    });
  }
  get toasts(): Toast[] {
    return this._toasts;
  }
  @Output() toastClosed = new EventEmitter<string>();

  private _toasts: Toast[] = [];
  private timeouts: Map<string, any> = new Map();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
  }

  onAnimationComplete(toast: Toast) {
    // Animation complete callback
  }

  getIconClasses(toast: Toast): string {
    return 'h-5 w-5';
  }

  get containerClasses(): string {
    const baseClasses = 'fixed p-4';
    const positionClasses = {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
    };
    return `${baseClasses} ${positionClasses[this.position]}`;
  }

  getToastClasses(toast: Toast): string {
    const baseClasses = 'pointer-events-auto w-full overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5';
    const variantClasses = {
      success: 'bg-green-50 ring-green-500',
      error: 'bg-red-50 ring-red-500',
      warning: 'bg-yellow-50 ring-yellow-500',
      info: 'bg-blue-50 ring-blue-500'
    };
    return `${baseClasses} ${variantClasses[toast.variant]}`;
  }

  getIconWrapperClasses(toast: Toast): string {
    const baseClasses = 'flex-shrink-0';
    const variantClasses = {
      success: 'text-green-400',
      error: 'text-red-400',
      warning: 'text-yellow-400',
      info: 'text-blue-400'
    };
    return `${baseClasses} ${variantClasses[toast.variant]}`;
  }

  getTitleClasses(toast: Toast): string {
    const baseClasses = 'text-sm font-medium';
    const variantClasses = {
      success: 'text-green-800',
      error: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800'
    };
    return `${baseClasses} ${variantClasses[toast.variant]}`;
  }

  getMessageClasses(toast: Toast): string {
    const baseClasses = 'text-sm';
    const variantClasses = {
      success: 'text-green-700',
      error: 'text-red-700',
      warning: 'text-yellow-700',
      info: 'text-blue-700'
    };
    return `${baseClasses} ${variantClasses[toast.variant]}`;
  }

  getCloseButtonClasses(toast: Toast): string {
    const baseClasses = 'inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantClasses = {
      success: 'text-green-400 hover:text-green-500 focus:ring-green-500',
      error: 'text-red-400 hover:text-red-500 focus:ring-red-500',
      warning: 'text-yellow-400 hover:text-yellow-500 focus:ring-yellow-500',
      info: 'text-blue-400 hover:text-blue-500 focus:ring-blue-500'
    };
    return `${baseClasses} ${variantClasses[toast.variant]}`;
  }

  getIconPath(toast: Toast): string {
    const paths = {
      success: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
      error: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
      warning: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
      info: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
    };
    return paths[toast.variant];
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.toastClosed.emit(id);
  }

  addToast(toast: ToastInput) {
    const id = Date.now().toString();
    const newToast: Toast = { ...toast, id };
    this.toasts = [...this.toasts, newToast];
  }
}
