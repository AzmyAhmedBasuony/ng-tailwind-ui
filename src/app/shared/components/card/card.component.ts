import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type CardVariant = 'default' | 'bordered' | 'elevated' | 'flat';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <div *ngIf="header" class="px-6 py-4 border-b border-color">
        <h3 class="text-lg font-semibold text-primary">{{ header }}</h3>
      </div>
      <div class="p-6">
        <ng-content></ng-content>
      </div>
      <div *ngIf="footer" class="px-6 py-4 border-t border-color bg-secondary">
        <ng-content select="[cardFooter]"></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() header?: string;
  @Input() footer?: boolean;

  get cardClasses(): string {
    const baseClasses = 'rounded-lg overflow-hidden';

    const variantClasses = {
      default: 'bg-primary',
      bordered: 'bg-primary border border-color',
      elevated: 'bg-primary shadow-lg',
      flat: 'bg-secondary'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}
