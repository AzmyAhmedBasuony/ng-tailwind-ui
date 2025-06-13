import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="space-y-6">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-card variant="elevated" class="bg-white">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Total Users</h3>
              <p class="text-2xl font-semibold text-gray-700">2,543</p>
              <p class="text-sm text-green-600">↑ 12% from last month</p>
            </div>
          </div>
        </app-card>

        <app-card variant="elevated" class="bg-white">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Revenue</h3>
              <p class="text-2xl font-semibold text-gray-700">$45,231</p>
              <p class="text-sm text-green-600">↑ 8% from last month</p>
            </div>
          </div>
        </app-card>

        <app-card variant="elevated" class="bg-white">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Page Views</h3>
              <p class="text-2xl font-semibold text-gray-700">12,345</p>
              <p class="text-sm text-red-600">↓ 3% from last month</p>
            </div>
          </div>
        </app-card>

        <app-card variant="elevated" class="bg-white">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Orders</h3>
              <p class="text-2xl font-semibold text-gray-700">1,234</p>
              <p class="text-sm text-green-600">↑ 5% from last month</p>
            </div>
          </div>
        </app-card>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-card variant="elevated" header="Recent Activity" class="bg-white">
          <div class="space-y-4">
            <div *ngFor="let activity of recentActivities" class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-gray-200"></div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.user }}</p>
                <p class="text-sm text-gray-500">{{ activity.action }}</p>
              </div>
              <div class="flex-shrink-0">
                <p class="text-sm text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </app-card>

        <app-card variant="elevated" header="Quick Actions" class="bg-white">
          <div class="grid grid-cols-2 gap-4">
            <button *ngFor="let action of quickActions"
                    class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg class="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="action.icon" />
              </svg>
              {{ action.label }}
            </button>
          </div>
        </app-card>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-card variant="elevated" header="Revenue Overview" class="bg-white">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </app-card>

        <app-card variant="elevated" header="User Growth" class="bg-white">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">User Growth Chart Placeholder</p>
          </div>
        </app-card>
      </div>
    </div>
  `
})
export class DashboardComponent {
  recentActivities = [
    { user: 'John Doe', action: 'Created a new project', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'Updated project settings', time: '3 hours ago' },
    { user: 'Mike Johnson', action: 'Added new team member', time: '5 hours ago' },
    { user: 'Sarah Wilson', action: 'Completed task "Update Documentation"', time: '1 day ago' },
    { user: 'Alex Brown', action: 'Started new sprint planning', time: '1 day ago' }
  ];

  quickActions = [
    { label: 'New Project', icon: 'M12 4v16m8-8H4' },
    { label: 'Add User', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { label: 'Generate Report', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];
}
