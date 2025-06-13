import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { ToastComponent, Toast, ToastInput } from '../../shared/components/toast/toast.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { SelectComponent, SelectOption } from '../../shared/components/select/select.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DateInputComponent } from '../../shared/components/date-input/date-input.component';
import { TimeInputComponent } from '../../shared/components/time-input/time-input.component';
import { DatetimeInputComponent } from '../../shared/components/datetime-input/datetime-input.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    CardComponent,
    InputComponent,
    AlertComponent,
    BadgeComponent,
    DropdownComponent,
    ModalComponent,
    TableComponent,
    SpinnerComponent,
    TabsComponent,
    AccordionComponent,
    ToastComponent,
    FileUploadComponent,
    ImageUploadComponent,
    SelectComponent,
    FormsModule,
    ReactiveFormsModule,
    DateInputComponent,
    TimeInputComponent,
    DatetimeInputComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">UI Components Demo</h1>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Navigation -->
        <nav class="mb-8">
          <div class="flex space-x-4">
            <a *ngFor="let section of sections"
               [href]="'#' + section.id"
               class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              {{ section.name }}
            </a>
          </div>
        </nav>

        <!-- Components Sections -->
        <div class="space-y-12">
          <!-- Buttons Section -->
          <section id="buttons" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Buttons</h2>
            <div class="space-y-4">
              <div class="flex flex-wrap gap-4">
                <app-button variant="primary">Primary</app-button>
                <app-button variant="secondary">Secondary</app-button>
                <app-button variant="outline">Outline</app-button>
                <app-button variant="ghost">Ghost</app-button>
                <app-button variant="danger">Danger</app-button>
              </div>
              <div class="flex flex-wrap gap-4">
                <app-button size="sm">Small</app-button>
                <app-button size="md">Medium</app-button>
                <app-button size="lg">Large</app-button>
              </div>
              <div class="flex flex-wrap gap-4">
                <app-button [disabled]="true">Disabled</app-button>
                <app-button [fullWidth]="true">Full Width</app-button>
              </div>
            </div>
          </section>

          <!-- Cards Section -->
          <section id="cards" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Cards</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <app-card variant="default" header="Default Card">
                <p>This is a default card with a header.</p>
              </app-card>
              <app-card variant="bordered" header="Bordered Card">
                <p>This is a bordered card with a header.</p>
              </app-card>
              <app-card variant="elevated" header="Elevated Card">
                <p>This is an elevated card with a header.</p>
              </app-card>
              <app-card variant="flat" header="Flat Card">
                <p>This is a flat card with a header.</p>
              </app-card>
            </div>
          </section>

          <!-- Inputs Section -->
          <section id="inputs" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Inputs</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Default Inputs -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">Default Inputs</h3>
                <div class="space-y-4">
                  <app-input
                    label="Default Input"
                    placeholder="Enter text..."
                    hint="This is a hint text"
                  ></app-input>

                  <app-input
                    label="Required Input"
                    placeholder="This field is required"
                    [required]="true"
                    hint="This field is required"
                  ></app-input>

                  <app-input
                    label="With Icon"
                    prefixIcon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    placeholder="Search..."
                    hint="Search with icon"
                  ></app-input>

                  <app-input
                    label="With Clear Button"
                    placeholder="Type to see clear button"
                    hint="Try typing something"
                  ></app-input>
                </div>
              </div>

              <!-- Variants and States -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">Variants & States</h3>
                <div class="space-y-4">
                  <app-input
                    label="Filled Variant"
                    variant="filled"
                    placeholder="Filled input"
                    hint="With filled background"
                  ></app-input>

                  <app-input
                    label="Outlined Variant"
                    variant="outlined"
                    placeholder="Outlined input"
                    hint="With thicker border"
                  ></app-input>

                  <app-input
                    label="Error State"
                    error="This field is required"
                    placeholder="Error input"
                  ></app-input>

                  <app-input
                    label="Disabled State"
                    [disabled]="true"
                    placeholder="Disabled input"
                  ></app-input>
                </div>
              </div>

              <!-- Sizes -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">Sizes</h3>
                <div class="space-y-4">
                  <app-input
                    label="Small Input"
                    size="sm"
                    placeholder="Small input"
                  ></app-input>

                  <app-input
                    label="Medium Input"
                    size="md"
                    placeholder="Medium input"
                  ></app-input>

                  <app-input
                    label="Large Input"
                    size="lg"
                    placeholder="Large input"
                  ></app-input>
                </div>
              </div>

              <!-- Types -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">Input Types</h3>
                <div class="space-y-4">
                  <app-input
                    label="Email Input"
                    type="email"
                    placeholder="Enter email"
                    hint="Must be a valid email"
                  ></app-input>

                  <app-input
                    label="Password Input"
                    type="password"
                    placeholder="Enter password"
                    hint="At least 8 characters"
                  ></app-input>

                  <app-input
                    label="Number Input"
                    type="number"
                    placeholder="Enter number"
                    hint="Numbers only"
                  ></app-input>
                </div>
              </div>
            </div>
          </section>

          <!-- Alerts Section -->
          <section id="alerts" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Alerts</h2>
            <div class="space-y-4">
              <app-alert variant="info" message="This is an info alert"></app-alert>
              <app-alert variant="success" message="This is a success alert"></app-alert>
              <app-alert variant="warning" message="This is a warning alert"></app-alert>
              <app-alert variant="error" message="This is an error alert"></app-alert>
            </div>
          </section>

          <!-- Badges Section -->
          <section id="badges" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Badges</h2>
            <div class="flex flex-wrap gap-4">
              <app-badge variant="default">Default</app-badge>
              <app-badge variant="primary">Primary</app-badge>
              <app-badge variant="success">Success</app-badge>
              <app-badge variant="warning">Warning</app-badge>
              <app-badge variant="error">Error</app-badge>
              <app-badge variant="info">Info</app-badge>
            </div>
          </section>

          <!-- Dropdowns Section -->
          <section id="dropdowns" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Dropdowns</h2>
            <div class="flex flex-wrap gap-4">
              <app-dropdown [items]="dropdownItems" triggerVariant="default">
                <button dropdownTrigger>Default Dropdown</button>
              </app-dropdown>

              <app-dropdown [items]="dropdownItems" triggerVariant="primary">
                <button dropdownTrigger>Primary Dropdown</button>
              </app-dropdown>

              <app-dropdown [items]="dropdownItems" triggerVariant="ghost">
                <button dropdownTrigger>Ghost Dropdown</button>
              </app-dropdown>

              <app-dropdown [items]="dropdownItems" menuPosition="left">
                <button dropdownTrigger>Left Aligned</button>
              </app-dropdown>
            </div>
          </section>

          <!-- Modals Section -->
          <section id="modals" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Modals</h2>
            <div class="flex flex-wrap gap-4">
              <app-button (click)="openModal()">Open Modal</app-button>
              <app-modal
                [isOpen]="isModalVisible"
                title="Demo Modal"
                size="md"
                (closed)="closeModal()">
                <div class="p-4">
                  <p>This is a demo modal with some content.</p>
                </div>
                <div modalFooter class="flex justify-end gap-2">
                  <app-button (click)="closeModal()">Cancel</app-button>
                  <app-button variant="primary" (click)="closeModal()">Confirm</app-button>
                </div>
              </app-modal>
            </div>
          </section>

          <!-- Tables Section -->
          <section id="tables" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Tables</h2>
            <app-table
              [columns]="tableColumns"
              [data]="tableData"
              [showSearch]="true"
              [showPagination]="true"
              [pageSize]="5">
            </app-table>
          </section>

          <!-- Spinners Section -->
          <section id="spinners" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Spinners</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="flex flex-col items-center">
                <app-spinner size="sm"></app-spinner>
                <span class="mt-2 text-sm">Small</span>
              </div>
              <div class="flex flex-col items-center">
                <app-spinner size="md"></app-spinner>
                <span class="mt-2 text-sm">Medium</span>
              </div>
              <div class="flex flex-col items-center">
                <app-spinner size="lg"></app-spinner>
                <span class="mt-2 text-sm">Large</span>
              </div>
              <div class="flex flex-col items-center">
                <app-spinner size="xl"></app-spinner>
                <span class="mt-2 text-sm">Extra Large</span>
              </div>
            </div>
          </section>

          <!-- Tabs Section -->
          <section id="tabs" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Tabs</h2>
            <app-tabs [tabs]="tabs" variant="default">
              <ng-template #tabContent let-tab>
                <div class="p-4">{{ tab.content }}</div>
              </ng-template>
            </app-tabs>
          </section>

          <!-- Accordion Section -->
          <section id="accordion" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Accordion</h2>
            <app-accordion [items]="accordionItems" variant="separated">
            </app-accordion>
          </section>

          <!-- Toast Section -->
          <section id="toasts" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Toasts</h2>
            <div class="flex flex-wrap gap-4">
              <app-button (click)="showSuccessToast()">Success Toast</app-button>
              <app-button (click)="showErrorToast()">Error Toast</app-button>
              <app-button (click)="showWarningToast()">Warning Toast</app-button>
              <app-button (click)="showInfoToast()">Info Toast</app-button>
            </div>
            <app-toast
              position="top-right"
              [toasts]="toasts"
              (toastClosed)="onToastClosed($event)">
            </app-toast>
          </section>

          <!-- File Uploads Section -->
          <section id="file-uploads" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">File Uploads</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- File Upload -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">File Upload</h3>
                <div class="space-y-4">
                  <app-file-upload
                    label="Single File Upload"
                    accept=".pdf,.doc,.docx"
                    hint="Upload a document (PDF, DOC, DOCX)"
                    [maxSize]="5"
                    (filesSelected)="onFilesSelected($event)"
                  ></app-file-upload>

                  <app-file-upload
                    label="Multiple Files Upload"
                    accept=".pdf,.doc,.docx"
                    [multiple]="true"
                    hint="Upload multiple documents"
                    [maxSize]="5"
                    (filesSelected)="onFilesSelected($event)"
                  ></app-file-upload>

                  <app-file-upload
                    label="Disabled File Upload"
                    [disabled]="true"
                    hint="This upload is disabled"
                  ></app-file-upload>
                </div>
              </div>

              <!-- Image Upload -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">Image Upload</h3>
                <div class="space-y-4">
                  <app-image-upload
                    label="Single Image Upload"
                    hint="Upload a profile picture"
                    [maxSize]="2"
                    (imageSelected)="onImageSelected($event)"
                  ></app-image-upload>

                  <app-image-upload
                    label="Multiple Images Upload"
                    [multiple]="true"
                    hint="Upload multiple images"
                    [maxSize]="2"
                    (imageSelected)="onImageSelected($event)"
                  ></app-image-upload>

                  <app-image-upload
                    label="Disabled Image Upload"
                    [disabled]="true"
                    hint="This upload is disabled"
                  ></app-image-upload>
                </div>
              </div>
            </div>
          </section>

          <!-- Select Inputs Section -->
          <section id="select-inputs" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Select Inputs</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Single Select -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">Single Select</h3>
                <div class="space-y-4">
                  <app-select
                    label="Basic Select"
                    [options]="selectOptions"
                    placeholder="Select an option"
                    (selectionChange)="onSelectChange($event)"
                  ></app-select>

                  <app-select
                    label="Searchable Select"
                    [options]="selectOptions"
                    [searchable]="true"
                    placeholder="Search and select an option"
                    (selectionChange)="onSelectChange($event)"
                  ></app-select>

                  <app-select
                    label="Select with Icons"
                    [options]="selectOptionsWithIcons"
                    placeholder="Select an option with icon"
                    (selectionChange)="onSelectChange($event)"
                  ></app-select>

                  <app-select
                    label="Disabled Select"
                    [options]="selectOptions"
                    [disabled]="true"
                    placeholder="This select is disabled"
                  ></app-select>
                </div>
              </div>

              <!-- Multi Select -->
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">Multi Select</h3>
                <div class="space-y-4">
                  <app-select
                    label="Basic Multi Select"
                    [options]="selectOptions"
                    [multiple]="true"
                    placeholder="Select multiple options"
                    (selectionChange)="onMultiSelectChange($event)"
                  ></app-select>

                  <app-select
                    label="Searchable Multi Select"
                    [options]="selectOptions"
                    [multiple]="true"
                    [searchable]="true"
                    placeholder="Search and select multiple options"
                    (selectionChange)="onMultiSelectChange($event)"
                  ></app-select>

                  <app-select
                    label="Multi Select with Descriptions"
                    [options]="selectOptionsWithDescriptions"
                    [multiple]="true"
                    placeholder="Select options with descriptions"
                    (selectionChange)="onMultiSelectChange($event)"
                  ></app-select>

                  <app-select
                    label="Disabled Multi Select"
                    [options]="selectOptions"
                    [multiple]="true"
                    [disabled]="true"
                    placeholder="This multi select is disabled"
                  ></app-select>
                </div>
              </div>
            </div>
          </section>

          <!-- Date Input Examples -->
          <section id="date-inputs" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Date Inputs</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Basic Date Input -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Basic Date Input</h3>
                <app-date-input
                  [(ngModel)]="dateValue"
                  placeholder="Select a date">
                </app-date-input>
                <div class="mt-2 text-sm text-gray-500">
                  Selected date: {{ dateValue || 'None' }}
                </div>
              </div>

              <!-- Date Input with Helper Text -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Date Input with Helper Text</h3>
                <app-date-input
                  [(ngModel)]="dateValue2"
                  placeholder="Select a date"
                  helperText="Please select a date within the next 30 days"
                  [showHelperText]="true">
                </app-date-input>
              </div>

              <!-- Disabled Date Input -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Disabled Date Input</h3>
                <app-date-input
                  [(ngModel)]="dateValue3"
                  placeholder="Select a date"
                  [disabled]="true">
                </app-date-input>
              </div>
            </div>
          </section>

          <!-- Time Input Examples -->
          <section id="time-inputs" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Time Inputs</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Basic Time Input -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Basic Time Input</h3>
                <app-time-input
                  [(ngModel)]="timeValue"
                  placeholder="Select a time">
                </app-time-input>
                <div class="mt-2 text-sm text-gray-500">
                  Selected time: {{ timeValue || 'None' }}
                </div>
              </div>

              <!-- Time Input with Helper Text -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Time Input with Helper Text</h3>
                <app-time-input
                  [(ngModel)]="timeValue2"
                  placeholder="Select a time"
                  helperText="Please select a time during business hours (9 AM - 5 PM)"
                  [showHelperText]="true">
                </app-time-input>
              </div>

              <!-- Disabled Time Input -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Disabled Time Input</h3>
                <app-time-input
                  [(ngModel)]="timeValue3"
                  placeholder="Select a time"
                  [disabled]="true">
                </app-time-input>
              </div>
            </div>
          </section>

          <!-- Datetime Input Examples -->
          <section id="datetime-inputs" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Datetime Inputs</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Basic Datetime Input -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Basic Datetime Input</h3>
                <app-datetime-input
                  [(ngModel)]="datetimeValue"
                  placeholder="Select date and time">
                </app-datetime-input>
                <div class="mt-2 text-sm text-gray-500">
                  Selected datetime: {{ datetimeValue || 'None' }}
                </div>
              </div>

              <!-- Datetime Input with Helper Text -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Datetime Input with Helper Text</h3>
                <app-datetime-input
                  [(ngModel)]="datetimeValue2"
                  placeholder="Select date and time"
                  helperText="Please select a date and time for your appointment"
                  [showHelperText]="true">
                </app-datetime-input>
              </div>

              <!-- Disabled Datetime Input -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">Disabled Datetime Input</h3>
                <app-datetime-input
                  [(ngModel)]="datetimeValue3"
                  placeholder="Select date and time"
                  [disabled]="true">
                </app-datetime-input>
              </div>
            </div>
          </section>

          <!-- Form Example -->
          <section id="form-example" class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-6">Form Example</h2>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Start Date and Time -->
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-1">Start Date</h3>
                  <app-date-input
                    formControlName="startDate"
                    placeholder="Select start date">
                  </app-date-input>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-1">Start Time</h3>
                  <app-time-input
                    formControlName="startTime"
                    placeholder="Select start time">
                  </app-time-input>
                </div>

                <!-- End Date and Time -->
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-1">End Date</h3>
                  <app-date-input
                    formControlName="endDate"
                    placeholder="Select end date">
                  </app-date-input>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-1">End Time</h3>
                  <app-time-input
                    formControlName="endTime"
                    placeholder="Select end time">
                  </app-time-input>
                </div>

                <!-- Event Datetime -->
                <div class="md:col-span-2">
                  <h3 class="text-lg font-medium text-gray-900 mb-1">Event Datetime</h3>
                  <app-datetime-input
                    formControlName="eventDatetime"
                    placeholder="Select event date and time"
                    helperText="Select the exact date and time for your event"
                    [showHelperText]="true">
                  </app-datetime-input>
                </div>
              </div>

              <div class="flex justify-end">
                <button type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  `,
})
export class DemoComponent {
  // Navigation sections
  sections = [
    { id: 'buttons', name: 'Buttons' },
    { id: 'cards', name: 'Cards' },
    { id: 'inputs', name: 'Inputs' },
    { id: 'alerts', name: 'Alerts' },
    { id: 'badges', name: 'Badges' },
    { id: 'dropdowns', name: 'Dropdowns' },
    { id: 'modals', name: 'Modals' },
    { id: 'tables', name: 'Tables' },
    { id: 'spinners', name: 'Spinners' },
    { id: 'tabs', name: 'Tabs' },
    { id: 'accordion', name: 'Accordion' },
    { id: 'toasts', name: 'Toasts' },
    { id: 'date-inputs', name: 'Date Inputs' },
    { id: 'time-inputs', name: 'Time Inputs' },
    { id: 'datetime-inputs', name: 'Datetime Inputs' },
    { id: 'form-example', name: 'Form Example' },
  ];

  // Modal state
  isModalVisible = false;

  // Dropdown items
  dropdownItems = [
    {
      label: 'Edit',
      icon: 'M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z',
      onClick: () => console.log('Edit clicked')
    },
    {
      label: 'Delete',
      icon: 'M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z',
      onClick: () => console.log('Delete clicked')
    },
    { divider: true },
    {
      label: 'Disabled Item',
      disabled: true,
      icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
    }
  ];

  // Table data
  tableColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' },
  ];

  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User' },
  ];

  // Tabs data
  tabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for tab 3' },
  ];

  // Accordion items
  accordionItems = [
    {
      id: 'item1',
      title: 'Accordion Item 1',
      content: 'Content for accordion item 1',
    },
    {
      id: 'item2',
      title: 'Accordion Item 2',
      content: 'Content for accordion item 2',
    },
    {
      id: 'item3',
      title: 'Accordion Item 3',
      content: 'Content for accordion item 3',
    },
  ];

  // Toast state
  toasts: Toast[] = [];

  // Select Options
  selectOptions: SelectOption[] = [
    { value: '1', label: 'Option 1', description: 'This is option 1' },
    { value: '2', label: 'Option 2', description: 'This is option 2' },
    { value: '3', label: 'Option 3', description: 'This is option 3' },
    { value: '4', label: 'Option 4', description: 'This is option 4', disabled: true },
    { value: '5', label: 'Option 5', description: 'This is option 5' }
  ];

  selectOptionsWithIcons: SelectOption[] = [
    { value: '1', label: 'User Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { value: '2', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { value: '3', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }
  ];

  selectOptionsWithDescriptions: SelectOption[] = [
    { value: '1', label: 'Basic Plan', description: 'Perfect for small projects' },
    { value: '2', label: 'Pro Plan', description: 'Best for growing businesses' },
    { value: '3', label: 'Enterprise Plan', description: 'For large organizations' }
  ];

  // Date Input Values
  dateValue: string = '';
  dateValue2: string = '';
  dateValue3: string = '';

  // Time Input Values
  timeValue: string = '';
  timeValue2: string = '';
  timeValue3: string = '';

  // Datetime Input Values
  datetimeValue: string = '';
  datetimeValue2: string = '';
  datetimeValue3: string = '';

  // Form
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      eventDatetime: ['']
    });
  }

  // Modal methods
  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  // Toast methods
  showToast(toast: ToastInput) {
    const id = Date.now().toString();
    this.toasts = [...this.toasts, { ...toast, id }];
  }

  onToastClosed(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  // Event Handlers
  onFilesSelected(files: File[]) {
    console.log('Selected files:', files);
    this.showToast({
      variant: 'success',
      message: `Selected ${files.length} file(s)`,
      title: 'Files Selected',
      duration: 3000
    });
  }

  onImageSelected(file: File) {
    console.log('Selected image:', file);
    this.showToast({
      variant: 'success',
      message: 'Image selected successfully',
      title: 'Image Selected',
      duration: 3000
    });
  }

  onSelectChange(value: any) {
    console.log('Selected value:', value);
    this.showToast({
      variant: 'info',
      message: `Selected: ${value}`,
      title: 'Option Selected',
      duration: 3000
    });
  }

  onMultiSelectChange(values: any[]) {
    console.log('Selected values:', values);
    this.showToast({
      variant: 'info',
      message: `Selected ${values.length} option(s)`,
      title: 'Options Selected',
      duration: 3000
    });
  }

  // Update the toast buttons to use the new showToast method
  showSuccessToast() {
    this.showToast({
      variant: 'success',
      title: 'Success Toast',
      message: 'This is a success toast message',
      duration: 3000
    });
  }

  showErrorToast() {
    this.showToast({
      variant: 'error',
      title: 'Error Toast',
      message: 'This is an error toast message',
      duration: 3000
    });
  }

  showWarningToast() {
    this.showToast({
      variant: 'warning',
      title: 'Warning Toast',
      message: 'This is a warning toast message',
      duration: 3000
    });
  }

  showInfoToast() {
    this.showToast({
      variant: 'info',
      title: 'Info Toast',
      message: 'This is an info toast message',
      duration: 3000
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
