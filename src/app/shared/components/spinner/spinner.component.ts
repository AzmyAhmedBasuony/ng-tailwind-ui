import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses" role="status">
      <svg
        [class]="spinnerClasses"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span *ngIf="text" [class]="textClasses">{{ text }}</span>
    </div>
  `,
  styles: []
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';
  @Input() color: SpinnerColor = 'primary';
  @Input() text?: string;
  @Input() fullScreen = false;

  get containerClasses(): string {
    const baseClasses = 'flex flex-col items-center justify-center';
    const fullScreenClass = this.fullScreen
      ? 'fixed inset-0 bg-white bg-opacity-75 z-50'
      : '';
    return `${baseClasses} ${fullScreenClass}`;
  }

  get spinnerClasses(): string {
    const baseClasses = 'animate-spin';
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16'
    };
    const colorClasses = {
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      success: 'text-green-600',
      danger: 'text-red-600',
      warning: 'text-yellow-600',
      info: 'text-indigo-600'
    };
    return `${baseClasses} ${sizeClasses[this.size]} ${colorClasses[this.color]}`;
  }

  get textClasses(): string {
    const baseClasses = 'mt-2 text-sm font-medium';
    const colorClasses = {
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      success: 'text-green-600',
      danger: 'text-red-600',
      warning: 'text-yellow-600',
      info: 'text-indigo-600'
    };
    return `${baseClasses} ${colorClasses[this.color]}`;
  }
}
