import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { LayoutService, LayoutType } from '../../services/layout.service';
import { ThemeToggleComponent } from '../../../components/theme-toggle/theme-toggle.component';
import { ThemeService } from '../../../services/theme.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 h-16 bg-primary border-b border-color z-50">
      <div class="h-full px-4 flex items-center justify-between">
        <!-- Mobile Menu Button (only visible on mobile) -->
        <button (click)="toggleMobileMenu()"
                class="md:hidden p-2 rounded-md text-secondary hover:text-primary hover:bg-tertiary focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path *ngIf="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path *ngIf="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Logo and System Name -->
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-color">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="flex flex-col">
            <h1 class="text-lg font-semibold text-primary">NG Tailwind UI</h1>
            <p class="text-xs text-secondary">Admin Dashboard</p>
          </div>
        </div>

        <!-- Right Section: Search, Theme Toggle, Notifications, Profile -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative hidden md:block">
            <input type="text"
                   placeholder="Search..."
                   class="w-64 pl-10 pr-4 py-2 text-sm text-primary bg-secondary rounded-lg border border-color focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color">
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Theme Toggle -->
          <app-theme-toggle></app-theme-toggle>

          <!-- Notifications -->
          <div class="relative" #notificationsMenu>
            <button (click)="toggleNotifications($event)"
                    class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span *ngIf="unreadNotifications > 0"
                    class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                {{unreadNotifications}}
              </span>
            </button>

            <!-- Notifications Dropdown Menu -->
            <div *ngIf="isNotificationsOpen"
                 class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <!-- Header -->
              <div class="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-sm font-semibold text-gray-900">Notifications</h3>
                <button *ngIf="unreadNotifications > 0"
                        (click)="markAllAsRead()"
                        class="text-xs text-primary-600 hover:text-primary-700">
                  Mark all as read
                </button>
              </div>

              <!-- Notifications List -->
              <div class="max-h-96 overflow-y-auto">
                <div *ngFor="let notification of notifications"
                     class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer"
                     [class.bg-blue-50]="!notification.read"
                     (click)="markAsRead(notification.id)">
                  <div class="flex items-start space-x-3">
                    <!-- Notification Icon -->
                    <div class="flex-shrink-0">
                      <div [ngClass]="{
                        'bg-blue-100 text-blue-600': notification.type === 'message',
                        'bg-green-100 text-green-600': notification.type === 'success',
                        'bg-yellow-100 text-yellow-600': notification.type === 'warning',
                        'bg-gray-100 text-gray-600': notification.type === 'info'
                      }" class="w-8 h-8 rounded-full flex items-center justify-center">
                        <svg *ngIf="notification.type === 'message'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <svg *ngIf="notification.type === 'success'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <svg *ngIf="notification.type === 'warning'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <svg *ngIf="notification.type === 'info'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    <!-- Notification Content -->
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900">{{notification.title}}</p>
                      <p class="text-sm text-gray-500 truncate">{{notification.message}}</p>
                      <p class="text-xs text-gray-400 mt-1">{{notification.time}}</p>
                    </div>

                    <!-- Unread Indicator -->
                    <div *ngIf="!notification.read" class="flex-shrink-0">
                      <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-4 py-2 border-t border-gray-100">
                <a href="#" class="text-sm text-primary-600 hover:text-primary-700 text-center block">
                  View all notifications
                </a>
              </div>
            </div>
          </div>

          <!-- Profile Menu -->
          <div class="relative" #profileMenu>
            <button (click)="toggleProfileMenu($event)"
                    class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <div class="relative">
                <img src="https://ui-avatars.com/api/?name=Azmy+Ahmed&background=0D8ABC&color=fff"
                     alt="Profile"
                     class="w-8 h-8 rounded-full border-2 border-white shadow-sm">
                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-gray-700">Azmy Ahmed</p>
                <p class="text-xs text-gray-500">Admin</p>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Profile Dropdown Menu -->
            <div *ngIf="isProfileMenuOpen"
                 class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Your Profile</span>
                </div>
              </a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Settings</span>
                </div>
              </a>
              <div class="border-t border-gray-100 my-1"></div>
              <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign out</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Dashboard Layout -->
    <div *ngIf="currentLayout === 'dashboard'" class="min-h-screen bg-secondary">
      <!-- Mobile Overlay (only visible when mobile menu is open) -->
      <div *ngIf="isMobileMenuOpen"
           (click)="closeMobileMenu()"
           class="fixed inset-0 bg-primary bg-opacity-50 z-40 md:hidden"></div>

      <!-- Side Navigation -->
      <nav [class.translate-x-0]="isMobileMenuOpen"
           [class.-translate-x-full]="!isMobileMenuOpen"
           class="fixed left-0 top-16 bottom-0 w-64 bg-primary shadow-sm overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0">
        <div class="px-4 py-6">
          <ul class="space-y-1">
            <li *ngFor="let item of navItems">
              <a [routerLink]="['/layouts', item.route]"
                 [routerLinkActive]="'bg-tertiary text-primary-color border-primary-color shadow-sm'"
                 class="flex items-center px-4 py-2.5 text-secondary rounded-md hover:bg-tertiary border-l-4 border-transparent transition-all duration-200 group">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200"
                     [class.text-primary-color]="router.isActive('/layouts/' + item.route, true)"
                     [class.group-hover:text-primary-color]="!router.isActive('/layouts/' + item.route, true)"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon" />
                </svg>
                <span class="text-sm font-medium">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Main Content -->
      <main [class.md:pl-64]="currentLayout === 'dashboard'"
            class="relative pt-16 z-30">
        <div class="max-w-7xl mx-auto py-6 px-4">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>

    <!-- Classic Layout -->
    <div *ngIf="currentLayout === 'classic'" class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Mobile Overlay (only visible when mobile menu is open) -->
      <div *ngIf="isMobileMenuOpen"
           (click)="closeMobileMenu()"
           class="fixed inset-0  bg-opacity-50 z-40 md:hidden"></div>

      <!-- Top Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-full mx-auto px-4   ">
          <div class="flex justify-between h-16">
            <!-- Logo -->
            <div class="flex items-center">
              <span class="text-xl font-bold text-gray-900">Classic</span>
            </div>

            <!-- Breadcrumbs -->
            <div class="flex items-center">
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="flex items-center space-x-2">
                  <li>
                    <div class="flex items-center">
                      <a [routerLink]="['/layouts']" class="text-gray-500 hover:text-gray-700">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </a>
                    </div>
                  </li>
                  <li *ngFor="let crumb of breadcrumbs; let last = last">
                    <div class="flex items-center">
                      <svg *ngIf="!last" class="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                      <a *ngIf="!last" [routerLink]="crumb.path" class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        {{ crumb.label }}
                      </a>
                      <span *ngIf="last" class="ml-2 text-sm font-medium text-gray-900">
                        {{ crumb.label }}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center space-x-4">
              <button class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div class="h-8 w-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </header>

      <div class="flex flex-1 relative">
        <!-- Side Navigation -->
        <nav [class.translate-x-0]="isMobileMenuOpen"
             [class.-translate-x-full]="!isMobileMenuOpen"
             class="fixed md:static left-0 top-16 bottom-0 w-64 bg-white shadow-sm overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0">
          <div class="px-4 py-6">
            <ul class="space-y-1">
              <li *ngFor="let item of navItems">
                <a [routerLink]="['/layouts', item.route]"
                   [routerLinkActive]="'bg-blue-50 text-primary-700 border-primary-500 shadow-sm'"
                   class="flex items-center px-4 py-2.5 text-gray-700 rounded-md hover:bg-gray-50 border-l-4 border-transparent transition-all duration-200 group">
                  <svg class="h-5 w-5 mr-3 transition-colors duration-200"
                       [class.text-primary-600]="router.isActive('/layouts/' + item.route, true)"
                       [class.group-hover:text-primary-600]="!router.isActive('/layouts/' + item.route, true)"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon" />
                  </svg>
                  <span class="text-sm font-medium">{{ item.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main Content -->
        <main
              class="flex-1 relative z-30">
          <div class="max-w-7xl mx-auto py-6   ">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>

      <!-- Footer -->
      <footer class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto py-4 px-4   ">
          <p class="text-center text-sm text-gray-500">© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>

    <!-- Minimal Layout -->
    <div *ngIf="currentLayout === 'minimal'" class="min-h-screen bg-gray-100 flex">
      <!-- Mobile Overlay (only visible when mobile menu is open) -->
      <div *ngIf="isMobileMenuOpen"
           (click)="closeMobileMenu()"
           class="fixed inset-0   bg-opacity-50 z-40 md:hidden"></div>

      <!-- Collapsible Side Navigation -->
      <nav [class.translate-x-0]="isMobileMenuOpen"
           [class.-translate-x-full]="!isMobileMenuOpen"
           [class.w-64]="!isSidebarCollapsed"
           [class.w-16]="isSidebarCollapsed"
           class="fixed md:static left-0 top-16 bottom-0 bg-white shadow-sm overflow-y-auto z-50 transform transition-all duration-300 ease-in-out md:translate-x-0">
        <div class="px-4 py-6">
          <button (click)="toggleSidebar()"
                  class="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul class="mt-6 space-y-1">
            <li *ngFor="let item of navItems">
              <a [routerLink]="['/layouts', item.route]"
                 [routerLinkActive]="'bg-blue-50 text-primary-700 border-primary-500 shadow-sm'"
                 class="flex items-center px-4 py-2.5 text-gray-700 rounded-md hover:bg-gray-50 border-l-4 border-transparent transition-all duration-200 group">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200"
                     [class.text-primary-600]="router.isActive('/layouts/' + item.route, true)"
                     [class.group-hover:text-primary-600]="!router.isActive('/layouts/' + item.route, true)"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon" />
                </svg>
                <span *ngIf="!isSidebarCollapsed" class="text-sm font-medium">{{ item.label }}</span>
                <span *ngIf="isSidebarCollapsed" class="text-sm font-medium" title="{{ item.label }}">•</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Main Content -->
      <main
            class="flex-1 relative z-30">
        <!-- Breadcrumbs -->
        <div class="bg-white shadow-sm px-4 py-3">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li>
                <div class="flex items-center">
                  <a [routerLink]="['/layouts']" class="text-gray-500 hover:text-gray-700">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </a>
                </div>
              </li>
              <li *ngFor="let crumb of breadcrumbs; let last = last">
                <div class="flex items-center">
                  <svg *ngIf="!last" class="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                  <a *ngIf="!last" [routerLink]="crumb.path" class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                    {{ crumb.label }}
                  </a>
                  <span *ngIf="last" class="ml-2 text-sm font-medium text-gray-900">
                    {{ crumb.label }}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div class="max-w-7xl mx-auto py-6   ">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>

    <!-- Layout Switcher -->
    <div class="fixed bottom-4 right-4 z-50">
      <div class="bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-2">
        <div class="px-2 py-1 text-xs font-medium text-gray-500 border-b border-gray-100">
          Switch Layout
        </div>
        <div class="flex flex-col space-y-1">
          <button *ngFor="let layout of layouts"
                  (click)="switchLayout(layout)"
                  [class.bg-primary-50]="currentLayout === layout"
                  [class.text-primary-700]="currentLayout === layout"
                  [class.border-primary-200]="currentLayout === layout"
                  class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 border border-transparent transition-colors duration-200"
                  [title]="getLayoutDescription(layout)">
            {{ layout | titlecase }}
            <span *ngIf="currentLayout === layout" class="ml-2 text-primary-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    /* Add smooth transitions for layout changes */
    :host > div {
      transition: all 0.3s ease-in-out;
    }

    /* Mobile-specific styles */
    @media (max-width: 768px) {
      nav {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      }
    }
  `]
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('notificationsMenu') notificationsMenu!: ElementRef;
  @ViewChild('profileMenu') profileMenu!: ElementRef;

  currentLayout: LayoutType = 'dashboard';
  isSidebarCollapsed = false;
  isDemoRoute = false;
  layouts: LayoutType[] = ['dashboard', 'classic', 'minimal'];
  breadcrumbs: { label: string; path: string }[] = [];
  isProfileMenuOpen = false;
  isNotificationsOpen = false;
  isMobileMenuOpen = false;

  // Sample notifications data
  notifications = [
    {
      id: 1,
      title: 'New message from Sarah',
      message: 'Hey, can we discuss the project timeline?',
      time: '5 minutes ago',
      type: 'message',
      read: false
    },
    {
      id: 2,
      title: 'Task completed',
      message: 'The dashboard design has been approved',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'New user registered',
      message: 'John Doe has joined the platform',
      time: '1 day ago',
      type: 'info',
      read: true
    },
    {
      id: 4,
      title: 'System update',
      message: 'New features have been deployed',
      time: '2 days ago',
      type: 'warning',
      read: true
    }
  ];

  get unreadNotifications() {
    return this.notifications.filter(n => !n.read).length;
  }

  navItems = [
    { label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', route: 'dashboard' },
    { label: 'UI Components', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', route: 'ui-components' },
    { label: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', route: 'reports' },
    { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', route: 'settings' },
    { label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', route: 'profile' }
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private layoutService: LayoutService,
    public router: Router,
    private route: ActivatedRoute,
    protected readonly themeService: ThemeService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.layoutService.currentLayout$.subscribe(layout => {
        this.currentLayout = layout;
      }),
      this.layoutService.sidebarCollapsed$.subscribe(collapsed => {
        this.isSidebarCollapsed = collapsed;
      }),
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.updateBreadcrumbs(event.urlAfterRedirects);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateBreadcrumbs(url: string) {
    const segments = url.split('/').filter(segment => segment);
    this.breadcrumbs = [];

    if (segments.length > 0) {
      // Add Home
      this.breadcrumbs.push({ label: 'Home', path: '/layouts' });

      // Add other segments
      let currentPath = '';
      segments.forEach(segment => {
        currentPath += `/${segment}`;
        const navItem = this.navItems.find(item => item.route === segment);
        if (navItem) {
          this.breadcrumbs.push({
            label: navItem.label,
            path: currentPath
          });
        }
      });
    }
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  switchLayout(layout: LayoutType) {
    this.layoutService.setLayout(layout);
  }

  getLayoutDescription(layout: LayoutType): string {
    switch (layout) {
      case 'dashboard':
        return 'Modern dashboard layout with fixed header and side navigation';
      case 'classic':
        return 'Traditional layout with header, side navigation, and footer';
      case 'minimal':
        return 'Clean layout with collapsible side navigation';
      default:
        return '';
    }
  }

  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.isNotificationsOpen = false;
    }
  }

  toggleNotifications(event: MouseEvent) {
    event.stopPropagation();
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isProfileMenuOpen = false;
    }
  }

  markAsRead(notificationId: number) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.notificationsMenu && !this.notificationsMenu.nativeElement.contains(event.target)) {
      this.isNotificationsOpen = false;
    }

    if (this.profileMenu && !this.profileMenu.nativeElement.contains(event.target)) {
      this.isProfileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('window:resize')
  onResize() {
    // Close mobile menu when screen size changes to desktop
    if (window.innerWidth >= 768) {
      this.isMobileMenuOpen = false;
    }
  }
}
