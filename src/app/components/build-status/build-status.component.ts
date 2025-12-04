import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BuildStatus {
  id: string;
  jobId: string;
  name: string;
  status: 'queued' | 'building' | 'success' | 'failed' | 'processed';
  progress: number;
  time: string;
}

@Component({
  selector: 'app-build-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-status.component.html',
  styleUrl: './build-status.component.css'
})
export class BuildStatusComponent {
  protected readonly builds = signal<BuildStatus[]>([
    { 
      id: 'build-001', 
      jobId: '09812',
      name: 'NodeJS Project',
      status: 'processed', 
      progress: 100, 
      time: '4:26:52 PM' 
    },
  ]);

  protected showLogs = signal(false);

  toggleLogs() {
    this.showLogs.set(!this.showLogs());
  }

  downloadArtifacts() {
    // Create a bogus artifact file for demo purposes
    const bogusContent = 'Build Artifact - Demo File\n\nThis is a placeholder artifact file for UX demonstration.\n';
    const blob = new Blob([bogusContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'build-001-artifacts.txt';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'success': return '#10b981';
      case 'processed': return '#10b981';
      case 'failed': return '#ef4444';
      case 'building': return '#fbbf24';
      case 'queued': return '#6366f1';
      default: return '#6b7280';
    }
  }
}
