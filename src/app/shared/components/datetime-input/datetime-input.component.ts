import { Component, Input, forwardRef, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datetime-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeInputComponent),
      multi: true
    }
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
            (click)="toggleDateTimePicker()"
            [disabled]="disabled"
            class="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            [class]="{'cursor-not-allowed': disabled}"
          >
            <svg class="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-200"
                 viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div *ngIf="showHelperText || hasError"
             class="mt-1.5 text-sm"
             [class]="hasError ? 'text-red-600' : 'text-gray-500'">
          {{ hasError ? errorMessage : helperText }}
        </div>

        <!-- DateTime Picker Popup -->
        <div *ngIf="showDateTimePicker"
             class="absolute z-50 mt-1 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
             [@dateTimePickerAnimation]>
          <div class="p-4">
            <!-- Calendar Header -->
            <div class="flex items-center justify-between mb-4">
              <button type="button"
                      (click)="previousMonth()"
                      class="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <svg class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="text-sm font-semibold text-gray-900">
                {{ currentMonthName }} {{ currentYear }}
              </div>
              <button type="button"
                      (click)="nextMonth()"
                      class="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <svg class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <!-- Week Days -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div *ngFor="let day of weekDays"
                   class="text-center text-xs font-medium text-gray-500">
                {{ day }}
              </div>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 mb-4">
              <button *ngFor="let day of calendarDays"
                      type="button"
                      (click)="selectDate(day)"
                      [disabled]="!day.isCurrentMonth"
                      class="relative p-2 text-center text-sm rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                      [class]="{
                        'text-gray-400': !day.isCurrentMonth,
                        'text-gray-900': day.isCurrentMonth,
                        'bg-primary-50 text-primary-600 font-semibold': day.isSelected,
                        'hover:bg-primary-100': day.isCurrentMonth && !day.isSelected
                      }">
                {{ day.date.getDate() }}
                <span *ngIf="day.isToday"
                      class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></span>
              </button>
            </div>

            <!-- Time Selection -->
            <div class="border-t border-gray-200 pt-4">
              <div class="flex items-center space-x-2">
                <div class="flex-1">
                  <label class="block text-xs font-medium text-gray-500 mb-1">Hours</label>
                  <input
                    type="number"
                    [(ngModel)]="hours"
                    (ngModelChange)="updateDateTime()"
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
                    (ngModelChange)="updateDateTime()"
                    min="0"
                    max="59"
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <!-- Quick Time Selection -->
              <div class="grid grid-cols-4 gap-2 mt-4">
                <button *ngFor="let time of quickTimes"
                        type="button"
                        (click)="selectQuickTime(time)"
                        class="text-sm text-gray-700 hover:bg-gray-50 rounded-md py-1.5 px-2 text-left focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {{ time }}
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-4 flex justify-between border-t border-gray-200 pt-4">
              <button type="button"
                      (click)="selectCurrentDateTime()"
                      class="text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:underline">
                Now
              </button>
              <button type="button"
                      (click)="clearDateTime()"
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
    @keyframes dateTimePickerFadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .date-time-picker-enter {
      animation: dateTimePickerFadeIn 0.2s ease-out;
    }
  `]
})
export class DatetimeInputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = 'Select date and time';
  @Input() helperText = '';
  @Input() showHelperText = false;
  @Input() errorMessage = '';

  value: string = '';
  displayValue: string = '';
  disabled = false;
  isFocused = false;
  hasError = false;
  showDateTimePicker = false;

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: any[] = [];

  hours: number = 0;
  minutes: number = 0;

  quickTimes = [
    '00:00', '06:00', '12:00', '18:00',
    '09:00', '15:00', '21:00', 'Now'
  ];

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private elementRef: ElementRef) {
    this.generateCalendarDays();
  }

  ngOnInit() {
    if (this.value) {
      this.initializeDateTimeValues();
    }
  }

  private initializeDateTimeValues() {
    const date = new Date(this.value);
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.generateCalendarDays();
  }

  get currentMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }

  generateCalendarDays() {
    if (this.currentMonth < 0) this.currentMonth = 0;
    if (this.currentMonth > 11) this.currentMonth = 11;

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Previous month days
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    const prevMonthDays = Array.from({ length: startingDay }, (_, i) => ({
      date: new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - startingDay + i + 1),
      isCurrentMonth: false,
      isSelected: this.isSelected(new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - startingDay + i + 1)),
      isToday: this.isToday(new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - startingDay + i + 1))
    }));

    // Current month days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(this.currentYear, this.currentMonth, i + 1);
      return {
        date,
        isCurrentMonth: true,
        isSelected: this.isSelected(date),
        isToday: this.isToday(date)
      };
    });

    // Next month days
    const remainingDays = 42 - (startingDay + daysInMonth); // 6 rows * 7 days
    const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
      date: new Date(this.currentYear, this.currentMonth + 1, i + 1),
      isCurrentMonth: false,
      isSelected: this.isSelected(new Date(this.currentYear, this.currentMonth + 1, i + 1)),
      isToday: this.isToday(new Date(this.currentYear, this.currentMonth + 1, i + 1))
    }));

    this.calendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  isSelected(date: Date): boolean {
    if (!this.value) return false;
    const selectedDate = new Date(this.value);
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  }

  toggleDateTimePicker() {
    if (!this.disabled) {
      this.showDateTimePicker = !this.showDateTimePicker;
      if (this.showDateTimePicker) {
        if (this.value) {
          this.initializeDateTimeValues();
        } else {
          const now = new Date();
          this.hours = now.getHours();
          this.minutes = now.getMinutes();
          this.currentMonth = now.getMonth();
          this.currentYear = now.getFullYear();
          this.generateCalendarDays();
        }
      }
    }
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDays();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays();
  }

  selectDate(day: any) {
    if (day.isCurrentMonth) {
      const date = day.date;
      date.setHours(this.hours, this.minutes);
      this.updateDateTimeValue(date);
    }
  }

  updateDateTime() {
    // Ensure valid ranges
    this.hours = Math.min(Math.max(0, this.hours), 23);
    this.minutes = Math.min(Math.max(0, this.minutes), 59);

    if (this.value) {
      const date = new Date(this.value);
      date.setHours(this.hours, this.minutes);
      this.updateDateTimeValue(date);
    }
  }

  updateDateTimeValue(date: Date) {
    this.value = date.toISOString();
    this.displayValue = date.toLocaleString('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    this.onChange(this.value);
  }

  selectQuickTime(time: string) {
    if (time === 'Now') {
      this.selectCurrentDateTime();
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    this.hours = hours;
    this.minutes = minutes;
    this.updateDateTime();
  }

  selectCurrentDateTime() {
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.updateDateTimeValue(now);
    this.generateCalendarDays();
  }

  clearDateTime() {
    this.value = '';
    this.displayValue = '';
    this.hours = 0;
    this.minutes = 0;
    this.onChange(null);
    this.showDateTimePicker = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDateTimePicker = false;
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
    // Input is readonly, handled by datetime picker selection
  }

  writeValue(value: string): void {
    this.value = value;
    if (value) {
      const date = new Date(value);
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.displayValue = date.toLocaleString('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
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
