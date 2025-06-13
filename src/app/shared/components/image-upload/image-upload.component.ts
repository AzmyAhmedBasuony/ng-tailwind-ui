import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <!-- Label -->
      <label *ngIf="label" [for]="id" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>

      <!-- Image Upload Area -->
      <div
        #dropZone
        [class]="getDropZoneClasses()"
        [@dragState]="isDragging ? 'dragging' : 'default'"
        (click)="!previewUrl && fileInput.click()"
      >
        <input
          #fileInput
          type="file"
          [id]="id"
          accept="image/*"
          [multiple]="multiple"
          [disabled]="disabled"
          (change)="onFileSelected($event)"
          class="hidden"
        />

        <!-- Preview Area -->
        <div *ngIf="previewUrl" class="relative w-full h-full">
          <img
            [src]="previewUrl"
            [alt]="label"
            class="w-full h-full object-cover rounded-lg"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-200 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
            <button
              type="button"
              class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              (click)="fileInput.click(); $event.stopPropagation()"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              *ngIf="!disabled"
              type="button"
              class="ml-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              (click)="removeImage(); $event.stopPropagation()"
            >
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Upload Icon and Text (shown when no preview) -->
        <div *ngIf="!previewUrl" class="text-center">
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
              <span>Upload an image</span>
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            PNG, JPG, GIF up to {{ maxSize || 10 }}MB
          </p>
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
export class ImageUploadComponent {
  @ViewChild('dropZone') dropZone!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() id = 'image-upload-' + Math.random().toString(36).substr(2, 9);
  @Input() label = '';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() error = '';
  @Input() hint = '';
  @Input() maxSize?: number; // in MB
  @Input() aspectRatio?: number; // width/height ratio

  @Output() imageSelected = new EventEmitter<File>();
  @Output() imageRemoved = new EventEmitter<void>();

  previewUrl: string | null = null;
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
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (!imageFile) {
      this.error = 'Please select an image file.';
      return;
    }

    if (this.maxSize && imageFile.size > this.maxSize * 1024 * 1024) {
      this.error = `Image is too large. Maximum size is ${this.maxSize}MB.`;
      return;
    }

    this.error = '';
    this.createPreview(imageFile);
    this.imageSelected.emit(imageFile);
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.previewUrl = null;
    this.fileInput.nativeElement.value = '';
    this.imageRemoved.emit();
    this.error = '';
  }

  getDropZoneClasses(): string {
    const baseClasses = `
      relative mt-1 flex justify-center rounded-lg border-2 border-dashed
      ${this.disabled ? 'border-gray-200 bg-gray-50' : 'border-gray-300 bg-white'}
      ${this.error ? 'border-red-300' : ''}
      transition-colors duration-200
    `;

    if (this.previewUrl) {
      return baseClasses + ' aspect-[4/3] overflow-hidden';
    }

    return baseClasses + ' px-6 py-10 cursor-pointer hover:border-primary-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  }
}
