import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate('150ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'translateY(-10px)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div class="relative" [class]="containerClasses">
      <!-- Label -->
      <label
        *ngIf="label"
        [for]="id"
        [class]="labelClasses"
        [class.text-red-600]="error"
        [class.text-gray-900]="!error"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>

      <!-- Input Container -->
      <div class="relative">
        <!-- Prefix Icon -->
        <div
          *ngIf="prefixIcon"
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            [class]="iconClasses"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path [attr.d]="prefixIcon" />
          </svg>
        </div>

        <!-- Input -->
        <input
          [type]="type"
          [id]="id"
          [name]="name"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [(ngModel)]="value"
          (ngModelChange)="onChange($event)"
          (blur)="onTouched()"
          (focus)="onFocus()"
          [class]="inputClasses"
          [attr.aria-invalid]="!!error"
          [attr.aria-describedby]="error ? id + '-error' : hint ? id + '-hint' : null"
        />

        <!-- Suffix Icon -->
        <div
          *ngIf="suffixIcon"
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
        >
          <svg
            [class]="iconClasses"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path [attr.d]="suffixIcon" />
          </svg>
        </div>

        <!-- Error Icon -->
        <div
          *ngIf="error"
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Clear Button -->
        <button
          *ngIf="showClearButton && value && !disabled"
          type="button"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          (click)="clearValue()"
          [class.pr-10]="error || suffixIcon"
        >
          <svg
            class="h-5 w-5 text-gray-400 hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Helper Text -->
      <div
        *ngIf="error || hint"
        [@slideInOut]
        [id]="error ? id + '-error' : id + '-hint'"
        [class]="helperTextClasses"
      >
        <p *ngIf="error" class="text-red-600">{{ error }}</p>
        <p *ngIf="hint && !error" class="text-gray-500">{{ hint }}</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() error?: string;
  @Input() hint?: string;
  @Input() name = '';
  @Input() id = '';
  @Input() required = false;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() showClearButton = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'default' | 'filled' | 'outlined' = 'default';

  value: string = '';
  isFocused = false;
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};

  @HostBinding('class') get hostClasses(): string {
    return 'w-full';
  }

  get containerClasses(): string {
    return 'space-y-1';
  }

  get labelClasses(): string {
    const baseClasses = 'block text-sm font-medium';
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };
    return `${baseClasses} ${sizeClasses[this.size]}`;
  }

  get inputClasses(): string {
    const baseClasses = 'block w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-0 transition-colors duration-200';
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    };
    const variantClasses = {
      default: 'bg-white border',
      filled: 'bg-gray-50 border-transparent',
      outlined: 'bg-transparent border-2'
    };
    const stateClasses = this.error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
      : this.disabled
      ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
      : this.isFocused
      ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    const paddingClasses = this.prefixIcon ? 'pl-10' : '';
    const paddingClasses2 = (this.suffixIcon || this.error || (this.showClearButton && this.value)) ? 'pr-10' : '';

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]} ${stateClasses} ${paddingClasses} ${paddingClasses2}`;
  }

  get iconClasses(): string {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };
    return `${sizeClasses[this.size]} text-gray-400`;
  }

  get helperTextClasses(): string {
    const sizeClasses = {
      sm: 'text-xs mt-0.5',
      md: 'text-sm mt-1',
      lg: 'text-base mt-1.5'
    };
    return sizeClasses[this.size];
  }

  onFocus() {
    this.isFocused = true;
  }

  clearValue() {
    this.value = '';
    this.onChange('');
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
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
