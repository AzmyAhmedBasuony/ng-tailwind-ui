import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `,
  styles: []
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
  @Input() rounded = true;
  @Input() dot = false;

  get badgeClasses(): string {
    const baseClasses = 'inline-flex items-center font-medium';
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base'
    };
    const roundedClass = this.rounded ? 'rounded-full' : 'rounded';
    const dotClass = this.dot ? 'w-2 h-2 rounded-full' : '';

    const variantClasses = {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-indigo-100 text-indigo-800'
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${roundedClass} ${variantClasses[this.variant]} ${dotClass}`;
  }
}
