import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Tab List -->
      <div [class]="tabListClasses" role="tablist">
        <button
          *ngFor="let tab of tabs"
          [id]="'tab-' + tab.id"
          [attr.aria-selected]="activeTab === tab.id"
          [attr.aria-controls]="'panel-' + tab.id"
          [disabled]="tab.disabled"
          [class]="getTabButtonClasses(tab)"
          (click)="selectTab(tab.id)"
          role="tab"
        >
          <!-- Icon if present -->
          <svg
            *ngIf="tab.icon"
            [class]="iconClasses"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path [attr.d]="tab.icon" />
          </svg>
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Panels -->
      <div class="mt-4">
        <div
          *ngFor="let tab of tabs"
          [id]="'panel-' + tab.id"
          [attr.aria-labelledby]="'tab-' + tab.id"
          [class]="getPanelClasses(tab)"
          role="tabpanel"
        >
          <ng-container *ngTemplateOutlet="tabContent; context: { $implicit: tab }">
          </ng-container>
        </div>
      </div>
    </div>

    <!-- Tab Content Template -->
    <ng-template #tabContent let-tab>
      <ng-content [ngTemplateOutlet]="getTabContent(tab.id)"></ng-content>
    </ng-template>
  `,
  styles: []
})
export class TabsComponent implements AfterContentInit {
  @Input() tabs: TabItem[] = [];
  @Input() variant: 'default' | 'pills' | 'underline' = 'default';
  @Input() activeTab: string = '';
  @Input() fullWidth = false;
  @Output() tabChange = new EventEmitter<string>();

  private tabContents: Map<string, any> = new Map();

  ngAfterContentInit() {
    if (this.tabs.length > 0 && !this.activeTab) {
      this.activeTab = this.tabs[0].id;
    }
  }

  selectTab(tabId: string) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTab = tabId;
      this.tabChange.emit(tabId);
    }
  }

  getTabButtonClasses(tab: TabItem): string {
    const baseClasses = 'inline-flex items-center px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
    const isActive = this.activeTab === tab.id;
    const isDisabled = tab.disabled;

    const variantClasses = {
      default: isActive
        ? 'border-b-2 border-blue-500 text-blue-600'
        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
      pills: isActive
        ? 'bg-blue-100 text-blue-700 rounded-md'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md',
      underline: isActive
        ? 'border-b-2 border-blue-500 text-blue-600'
        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    };

    const widthClass = this.fullWidth ? 'flex-1 justify-center' : '';
    const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${baseClasses} ${variantClasses[this.variant]} ${widthClass} ${disabledClass}`;
  }

  get tabListClasses(): string {
    const baseClasses = 'border-b border-gray-200';
    const variantClasses = {
      default: 'flex space-x-8',
      pills: 'flex space-x-4',
      underline: 'flex space-x-8'
    };
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  getPanelClasses(tab: TabItem): string {
    const baseClasses = 'transition-opacity duration-200';
    const activeClass = this.activeTab === tab.id ? 'opacity-100' : 'opacity-0 hidden';
    return `${baseClasses} ${activeClass}`;
  }

  get iconClasses(): string {
    return 'mr-2 h-5 w-5';
  }

  getTabContent(tabId: string): any {
    return this.tabContents.get(tabId);
  }

  registerTabContent(tabId: string, content: any) {
    this.tabContents.set(tabId, content);
  }
}
