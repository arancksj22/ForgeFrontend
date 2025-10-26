import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repo-link',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repo-link.component.html',
  styleUrl: './repo-link.component.css'
})
export class RepoLinkComponent {
  protected readonly repoUrl = signal<string>('');

  submitRepo() {
    if (!this.repoUrl()) return;
    console.log('Building from repo:', this.repoUrl());
  }
}
