import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <!-- Label -->
      <label *ngIf="label" [for]="id" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>

      <!-- File Upload Area -->
      <div
        #dropZone
        [class]="getDropZoneClasses()"
        [@dragState]="isDragging ? 'dragging' : 'default'"
        (click)="fileInput.click()"
      >
        <input
          #fileInput
          type="file"
          [id]="id"
          [accept]="accept"
          [multiple]="multiple"
          [disabled]="disabled"
          (change)="onFileSelected($event)"
          class="hidden"
        />

        <!-- Upload Icon and Text -->
        <div class="text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="mt-4 flex text-sm text-gray-600">
            <label
              [for]="id"
              class="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
            >
              <span>Upload a file</span>
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            {{ accept ? 'Accepted files: ' + accept : 'All files' }}
            {{ maxSize ? 'up to ' + maxSize + 'MB' : '' }}
          </p>
        </div>

        <!-- Selected Files List -->
        <div *ngIf="selectedFiles.length > 0" class="mt-4">
          <ul class="divide-y divide-gray-200">
            <li *ngFor="let file of selectedFiles" class="py-2 flex items-center justify-between">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-2 text-sm text-gray-500">{{ file.name }}</span>
                <span class="ml-2 text-xs text-gray-400">({{ formatFileSize(file.size) }})</span>
              </div>
              <button
                type="button"
                class="text-red-500 hover:text-red-700"
                (click)="removeFile(file); $event.stopPropagation()"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Error Message -->
      <p *ngIf="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

      <!-- Hint Text -->
      <p *ngIf="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
  `,
  animations: [
    trigger('dragState', [
      state('default', style({
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff'
      })),
      state('dragging', style({
        borderColor: '#3b82f6',
        backgroundColor: '#eff6ff'
      })),
      transition('default <=> dragging', animate('200ms ease-in-out'))
    ])
  ],
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class FileUploadComponent {
  @ViewChild('dropZone') dropZone!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() id = 'file-upload-' + Math.random().toString(36).substr(2, 9);
  @Input() label = '';
  @Input() accept = '';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() error = '';
  @Input() hint = '';
  @Input() maxSize?: number; // in MB

  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() filesRemoved = new EventEmitter<File[]>();

  selectedFiles: File[] = [];
  isDragging = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  private handleFiles(files: File[]) {
    const validFiles = files.filter(file => {
      if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
        this.error = `File ${file.name} is too large. Maximum size is ${this.maxSize}MB.`;
        return false;
      }
      if (this.accept) {
        const acceptedTypes = this.accept.split(',').map(type => type.trim());
        const fileType = file.type;
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

        const isValid = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return fileExtension === type.toLowerCase();
          }
          return fileType.match(new RegExp(type.replace('*', '.*')));
        });

        if (!isValid) {
          this.error = `File ${file.name} is not an accepted file type.`;
          return false;
        }
      }
      return true;
    });

    if (validFiles.length > 0) {
      this.error = '';
      if (this.multiple) {
        this.selectedFiles = [...this.selectedFiles, ...validFiles];
      } else {
        this.selectedFiles = [validFiles[0]];
      }
      this.filesSelected.emit(this.selectedFiles);
    }
  }

  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    this.filesRemoved.emit(this.selectedFiles);
    this.error = '';
  }

  getDropZoneClasses(): string {
    return `
      relative mt-1 flex justify-center rounded-lg border-2 border-dashed
      ${this.disabled ? 'border-gray-200 bg-gray-50' : 'border-gray-300 bg-white'}
      ${this.error ? 'border-red-300' : ''}
      px-6 py-10 cursor-pointer
      hover:border-primary-500 hover:bg-gray-50
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      transition-colors duration-200
    `;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
