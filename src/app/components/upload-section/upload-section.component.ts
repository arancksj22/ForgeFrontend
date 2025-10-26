import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-section.component.html',
  styleUrl: './upload-section.component.css'
})
export class UploadSectionComponent {
  protected readonly selectedFile = signal<File | null>(null);
  protected readonly buildType = signal<string>('maven');
  protected readonly isUploading = signal<boolean>(false);

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  clearFile() {
    this.selectedFile.set(null);
  }

  startBuild() {
    if (!this.selectedFile()) return;
    
    this.isUploading.set(true);
    
    // Simulate upload
    setTimeout(() => {
      this.isUploading.set(false);
      console.log('Build started for:', this.selectedFile()?.name);
    }, 2000);
  }
}
