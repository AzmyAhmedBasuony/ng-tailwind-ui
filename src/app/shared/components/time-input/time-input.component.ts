import { Component, Input, forwardRef, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-time-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    }
  ],
  animations: [
    trigger('timePickerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  template: `
    <div class="relative">
      <div class="relative group">
        <div class="relative">
          <input
            type="text"
            [value]="displayValue"
            (input)="onInput($event)"
            (focus)="onFocus()"
            (blur)="onBlur()"
            [disabled]="disabled"
            [placeholder]="placeholder"
            readonly
            class="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 transition-all duration-200
                   focus:ring-2 focus:ring-primary-500 focus:ring-inset focus:shadow-md
                   disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200
                   group-hover:ring-primary-400"
            [class]="{
              'cursor-not-allowed': disabled,
              'ring-primary-500': isFocused,
              'ring-red-500': hasError
            }"
          />
          <button
            type="button"
            (click)="toggleTimePicker()"
            [disabled]="disabled"
            class="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            [class]="{'cursor-not-allowed': disabled}"
          >
            <svg class="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-200"
                 viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm.75-8.25a.75.75 0 00-1.5 0v3.5c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5h-1.75V7.75z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div *ngIf="showHelperText || hasError"
             class="mt-1.5 text-sm"
             [class]="hasError ? 'text-red-600' : 'text-gray-500'">
          {{ hasError ? errorMessage : helperText }}
        </div>

        <!-- Time Picker Popup -->
        <div *ngIf="showTimePicker"
             class="absolute z-50 mt-1 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
             [@timePickerAnimation]>
          <div class="p-4">
            <!-- Time Input -->
            <div class="flex items-center space-x-2 mb-4">
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-500 mb-1">Hours</label>
                <input
                  type="number"
                  [(ngModel)]="hours"
                  (ngModelChange)="updateTime()"
                  min="0"
                  max="23"
                  class="block w-full rounded-md border-0 py-1.5 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-500 mb-1">Minutes</label>
                <input
                  type="number"
                  [(ngModel)]="minutes"
                  (ngModelChange)="updateTime()"
                  min="0"
                  max="59"
                  class="block w-full rounded-md border-0 py-1.5 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <!-- Quick Time Selection -->
            <div class="grid grid-cols-2 gap-2">
              <button *ngFor="let time of quickTimes"
                      type="button"
                      (click)="selectQuickTime(time)"
                      class="text-sm text-gray-700 hover:bg-gray-50 rounded-md py-1.5 px-2 text-left focus:outline-none focus:ring-2 focus:ring-primary-500">
                {{ time }}
              </button>
            </div>

            <!-- Actions -->
            <div class="mt-4 flex justify-between">
              <button type="button"
                      (click)="selectCurrentTime()"
                      class="text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:underline">
                Now
              </button>
              <button type="button"
                      (click)="clearTime()"
                      class="text-sm text-gray-600 hover:text-gray-700 focus:outline-none focus:underline">
                Clear
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
    }
    @keyframes timePickerFadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .time-picker-enter {
      animation: timePickerFadeIn 0.2s ease-out;
    }
  `]
})
export class TimeInputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = 'Select time';
  @Input() helperText = '';
  @Input() showHelperText = false;
  @Input() errorMessage = '';

  value: string = '';
  displayValue: string = '';
  disabled = false;
  isFocused = false;
  hasError = false;
  showTimePicker = false;

  hours: number = 0;
  minutes: number = 0;

  quickTimes = [
    '00:00', '06:00', '12:00', '18:00',
    '09:00', '15:00', '21:00', 'Now'
  ];

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private elementRef: ElementRef) {
    // Initialize time values if we have a value
    if (this.value) {
      this.initializeTimeValues();
    }
  }

  ngOnInit() {
    // Initialize time values if we have a value
    if (this.value) {
      this.initializeTimeValues();
    }
  }

  private initializeTimeValues() {
    const [hours, minutes] = this.value.split(':').map(Number);
    this.hours = hours;
    this.minutes = minutes;
    this.updateTime();
  }

  toggleTimePicker() {
    if (!this.disabled) {
      this.showTimePicker = !this.showTimePicker;
      // Initialize time values when opening the picker
      if (this.showTimePicker) {
        if (this.value) {
          this.initializeTimeValues();
        } else {
          // If no value, set to current time
          const now = new Date();
          this.hours = now.getHours();
          this.minutes = now.getMinutes();
          this.updateTime();
        }
      }
    }
  }

  updateTime() {
    // Ensure valid ranges
    this.hours = Math.min(Math.max(0, this.hours), 23);
    this.minutes = Math.min(Math.max(0, this.minutes), 59);

    // Format time
    const formattedHours = this.hours.toString().padStart(2, '0');
    const formattedMinutes = this.minutes.toString().padStart(2, '0');
    this.value = `${formattedHours}:${formattedMinutes}`;
    this.displayValue = this.formatTimeForDisplay(this.hours, this.minutes);
    this.onChange(this.value);
  }

  formatTimeForDisplay(hours: number, minutes: number): string {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${formattedMinutes} ${period}`;
  }

  selectQuickTime(time: string) {
    if (time === 'Now') {
      this.selectCurrentTime();
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    this.hours = hours;
    this.minutes = minutes;
    this.updateTime();
    this.showTimePicker = false;
  }

  selectCurrentTime() {
    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.updateTime();
    this.showTimePicker = false;
  }

  clearTime() {
    this.value = '';
    this.displayValue = '';
    this.hours = 0;
    this.minutes = 0;
    this.onChange(null);
    this.showTimePicker = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showTimePicker = false;
      this.isFocused = false;
    }
  }

  onFocus() {
    this.isFocused = true;
    this.onTouched();
  }

  onBlur() {
    this.isFocused = false;
  }

  onInput(event: Event) {
    // Input is readonly, handled by time picker selection
  }

  writeValue(value: string): void {
    this.value = value;
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      this.hours = hours;
      this.minutes = minutes;
      this.displayValue = this.formatTimeForDisplay(hours, minutes);
    } else {
      this.displayValue = '';
      this.hours = 0;
      this.minutes = 0;
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

  setError(message: string) {
    this.hasError = true;
    this.errorMessage = message;
  }

  clearError() {
    this.hasError = false;
    this.errorMessage = '';
  }
}
