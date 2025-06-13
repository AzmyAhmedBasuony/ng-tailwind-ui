import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Profile Header -->
      <app-card class="bg-white shadow-sm border border-gray-100">
        <div class="p-6">
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <!-- Avatar Section -->
            <div class="flex-shrink-0">
              <div class="relative">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
                  alt="Profile"
                  class="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                />
                <button
                  class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-2xl font-bold text-gray-900">azmy ahmed</h1>
              <p class="text-gray-600">Senior Software Engineer</p>
              <div class="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Tanta, Egypt
                </span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Full-time
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex-shrink-0 flex flex-col space-y-2">
              <app-button variant="primary" class="w-full">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </app-button>
              <app-button variant="secondary" class="w-full">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Calendar
              </app-button>
            </div>
          </div>
        </div>
      </app-card>

      <!-- Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Section -->
          <app-card class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p class="text-gray-600">
                Experienced software engineer with a passion for creating elegant solutions to complex problems.
                Specialized in full-stack development with expertise in modern web technologies.
              </p>
              <div class="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Email</h3>
                  <p class="mt-1 text-sm text-gray-900">azmyahmedbasuony&#64;gmail.com</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Phone</h3>
                  <p class="mt-1 text-sm text-gray-900">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Department</h3>
                  <p class="mt-1 text-sm text-gray-900">Engineering</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Join Date</h3>
                  <p class="mt-1 text-sm text-gray-900">January 2020</p>
                </div>
              </div>
            </div>
          </app-card>

          <!-- Recent Activity -->
          <app-card class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                      <svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Created new project</p>
                    <p class="text-sm text-gray-500">Dashboard UI Implementation</p>
                    <p class="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                      <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Completed task</p>
                    <p class="text-sm text-gray-500">User Authentication Module</p>
                    <p class="text-xs text-gray-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </app-card>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Skills -->
          <app-card class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">Angular</span>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">TypeScript</span>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">Node.js</span>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">React</span>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">Python</span>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">AWS</span>
              </div>
            </div>
          </app-card>

          <!-- Team Members -->
          <app-card class="bg-white shadow-sm border border-gray-100">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <img class="h-8 w-8 rounded-full" src="https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff" alt="Jane Smith" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Jane Smith</p>
                    <p class="text-xs text-gray-500">Frontend Developer</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <img class="h-8 w-8 rounded-full" src="https://ui-avatars.com/api/?name=Mike+Johnson&background=0D8ABC&color=fff" alt="Mike Johnson" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Mike Johnson</p>
                    <p class="text-xs text-gray-500">Backend Developer</p>
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
export class ProfileComponent {
  // Component logic here
}
