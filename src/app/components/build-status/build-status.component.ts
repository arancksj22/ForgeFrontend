import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BuildStatus {
  id: string;
  status: 'queued' | 'building' | 'success' | 'failed';
  progress: number;
  timestamp: Date;
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
    { id: 'build-001', status: 'success', progress: 100, timestamp: new Date(Date.now() - 3600000) },
  ]);

  getStatusColor(status: string): string {
    switch (status) {
      case 'success': return '#10b981';
      case 'failed': return '#ef4444';
      case 'building': return '#fbbf24';
      case 'queued': return '#6366f1';
      default: return '#6b7280';
    }
  }
}
