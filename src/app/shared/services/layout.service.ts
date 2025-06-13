import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LayoutType = 'dashboard' | 'classic' | 'minimal';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private currentLayoutSubject = new BehaviorSubject<LayoutType>('dashboard');
  currentLayout$ = this.currentLayoutSubject.asObservable();

  private sidebarCollapsedSubject = new BehaviorSubject<boolean>(false);
  sidebarCollapsed$ = this.sidebarCollapsedSubject.asObservable();

  constructor() {}

  setLayout(layout: LayoutType) {
    this.currentLayoutSubject.next(layout);
  }

  toggleSidebar() {
    this.sidebarCollapsedSubject.next(!this.sidebarCollapsedSubject.value);
  }

  getCurrentLayout(): LayoutType {
    return this.currentLayoutSubject.value;
  }

  isSidebarCollapsed(): boolean {
    return this.sidebarCollapsedSubject.value;
  }
}
