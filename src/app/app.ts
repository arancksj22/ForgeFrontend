import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BuildStatus {
  id: string;
  status: 'queued' | 'building' | 'success' | 'failed';
  progress: number;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly selectedFile = signal<File | null>(null);
  protected readonly buildType = signal<string>('maven');
  protected readonly isUploading = signal<boolean>(false);
  protected readonly repoUrl = signal<string>('');
  protected readonly builds = signal<BuildStatus[]>([
    { id: 'build-001', status: 'success', progress: 100, timestamp: new Date(Date.now() - 3600000) },
    { id: 'build-002', status: 'building', progress: 67, timestamp: new Date(Date.now() - 300000) },
    { id: 'build-003', status: 'queued', progress: 0, timestamp: new Date() },
  ]);

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

  startBuild() {
    if (!this.selectedFile()) return;
    this.isUploading.set(true);
    
    // Simulate upload and build start
    setTimeout(() => {
      const newBuild: BuildStatus = {
        id: `build-${Date.now()}`,
        status: 'queued',
        progress: 0,
        timestamp: new Date()
      };
      this.builds.update(builds => [newBuild, ...builds]);
      this.isUploading.set(false);
      this.selectedFile.set(null);
      
      // Simulate build progression
      setTimeout(() => {
        this.builds.update(builds => {
          const updated = [...builds];
          if (updated[0]) updated[0].status = 'building';
          return updated;
        });
      }, 1000);
    }, 2000);
  }

  clearFile() {
    this.selectedFile.set(null);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'success': return 'var(--forge-success)';
      case 'building': return 'var(--forge-building)';
      case 'failed': return 'var(--forge-error)';
      default: return 'var(--forge-queued)';
    }
  }
}
