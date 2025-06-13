import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SelectComponent } from '../../shared/components/select/select.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, SelectComponent],
  template: `
    <div class="space-y-6">
      <!-- Settings Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
        <app-button variant="primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </app-button>
      </div>

      <!-- Settings Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Navigation -->
        <div class="lg:col-span-1">
          <app-card class="bg-white shadow-sm border border-gray-100">
            <div class="p-4">
              <nav class="space-y-1">
                <a href="#account" class="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account Settings
                </a>
                <a href="#notifications" class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </a>
                <a href="#security" class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security
                </a>
                <a href="#appearance" class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Appearance
                </a>
              </nav>
            </div>
          </app-card>
        </div>

        <!-- Right Column - Settings Forms -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Account Settings -->
          <app-card id="account" class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value="John" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value="Doe" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value="john.doe@example.com" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Language</label>
                  <app-select
                    [options]="languages"
                    placeholder="Select language"
                    class="mt-1">
                  </app-select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Time Zone</label>
                  <app-select
                    [options]="timezones"
                    placeholder="Select timezone"
                    class="mt-1">
                  </app-select>
                </div>
              </div>
            </div>
          </app-card>

          <!-- Notification Settings -->
          <app-card id="notifications" class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
                    <p class="text-sm text-gray-500">Receive email updates about your account</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Push Notifications</h3>
                    <p class="text-sm text-gray-500">Receive push notifications in your browser</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </app-card>

          <!-- Security Settings -->
          <app-card id="security" class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Current Password</label>
                  <input type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <app-button variant="secondary">Enable 2FA</app-button>
                </div>
              </div>
            </div>
          </app-card>

          <!-- Appearance Settings -->
          <app-card id="appearance" class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Theme</label>
                  <div class="mt-2 grid grid-cols-3 gap-3">
                    <div class="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
                      <input type="radio" name="theme" class="sr-only" checked>
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <span class="block text-sm font-medium text-gray-900">Light</span>
                          <span class="mt-1 flex items-center text-sm text-gray-500">Default theme</span>
                        </span>
                      </span>
                      <span class="pointer-events-none absolute -inset-px rounded-lg border-2 border-blue-500"></span>
                    </div>
                    <div class="relative flex cursor-pointer rounded-lg border border-gray-300 bg-gray-900 p-4 shadow-sm focus:outline-none">
                      <input type="radio" name="theme" class="sr-only">
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <span class="block text-sm font-medium text-white">Dark</span>
                          <span class="mt-1 flex items-center text-sm text-gray-400">Dark mode</span>
                        </span>
                      </span>
                    </div>
                    <div class="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
                      <input type="radio" name="theme" class="sr-only">
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <span class="block text-sm font-medium text-gray-900">System</span>
                          <span class="mt-1 flex items-center text-sm text-gray-500">Follow system</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SettingsComponent {
  languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  timezones = [
    { value: 'utc', label: 'UTC' },
    { value: 'est', label: 'Eastern Time' },
    { value: 'cst', label: 'Central Time' },
    { value: 'pst', label: 'Pacific Time' }
  ];
}
