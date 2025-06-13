import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Angular Tailwind UI Components</h1>
        <p class="text-xl text-gray-600 mb-8">
          A collection of reusable UI components built with Angular and Tailwind CSS
        </p>
        <a
          routerLink="/demo"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Components Demo
        </a>
      </div>
    </div>
  `,
})
export class HomeComponent {}
