import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="themeService.toggleTheme()"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
      [class.bg-primary-color]="themeService.currentTheme() === 'dark'"
      [class.bg-tertiary]="themeService.currentTheme() === 'light'"
      role="switch"
      [attr.aria-checked]="themeService.currentTheme() === 'dark'"
    >
      <span class="sr-only">Toggle theme</span>
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-primary transition-transform"
        [class.translate-x-6]="themeService.currentTheme() === 'dark'"
        [class.translate-x-1]="themeService.currentTheme() === 'light'"
      ></span>
    </button>
  `,
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
}
