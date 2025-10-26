import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadSectionComponent } from './components/upload-section/upload-section.component';
import { RepoLinkComponent } from './components/repo-link/repo-link.component';
import { ArchitectureComponent } from './components/architecture/architecture.component';
import { BuildStatusComponent } from './components/build-status/build-status.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    UploadSectionComponent,
    RepoLinkComponent,
    ArchitectureComponent,
    BuildStatusComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
