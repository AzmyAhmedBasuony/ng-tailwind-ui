import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="alertClasses" role="alert">
      <div class="flex">
        <div class="flex-shrink-0">
          <ng-container [ngSwitch]="variant">
            <!-- Info Icon -->
            <svg *ngSwitchCase="'info'" class="h-5 w-5 text-primary-color" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0v4a1 1 0 102 0V6zm1 5a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
            <!-- Success Icon -->
            <svg *ngSwitchCase="'success'" class="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <!-- Warning Icon -->
            <svg *ngSwitchCase="'warning'" class="h-5 w-5 text-warning" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <!-- Error Icon -->
            <svg *ngSwitchCase="'error'" class="h-5 w-5 text-error" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </ng-container>
        </div>
        <div class="ml-3">
          <h3 *ngIf="title" [class]="titleClasses">{{ title }}</h3>
          <div [class]="messageClasses">
            <ng-content></ng-content>
          </div>
        </div>
        <div *ngIf="dismissible" class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button
              type="button"
              [class]="dismissButtonClasses"
              (click)="onDismiss.emit()"
            >
              <span class="sr-only">Dismiss</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title?: string;
  @Input() dismissible = false;
  @Output() onDismiss = new EventEmitter<void>();

  get alertClasses(): string {
    const baseClasses = 'rounded-md p-4';
    const variantClasses = {
      info: 'bg-primary border border-primary-color/20',
      success: 'bg-primary border border-success/20',
      warning: 'bg-primary border border-warning/20',
      error: 'bg-primary border border-error/20'
    };
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  get titleClasses(): string {
    const baseClasses = 'text-sm font-medium';
    const variantClasses = {
      info: 'text-primary-color',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  get messageClasses(): string {
    const baseClasses = 'text-sm';
    const variantClasses = {
      info: 'text-secondary',
      success: 'text-secondary',
      warning: 'text-secondary',
      error: 'text-secondary'
    };
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  get dismissButtonClasses(): string {
    const baseClasses = 'inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantClasses = {
      info: 'bg-primary text-primary-color hover:bg-tertiary focus:ring-primary-color',
      success: 'bg-primary text-success hover:bg-tertiary focus:ring-success',
      warning: 'bg-primary text-warning hover:bg-tertiary focus:ring-warning',
      error: 'bg-primary text-error hover:bg-tertiary focus:ring-error'
    };
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}
