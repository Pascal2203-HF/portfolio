import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectService } from '../../core/services/api.service';
import { Project } from '../../core/models/models';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  template: `
    <section class="section" *ngIf="project">
      <div class="container">
        <a routerLink="/projects" class="back-link">&larr; Retour aux projets</a>
        <h2 class="mt-3 text-gradient">{{ project.title }}</h2>
        <p class="opacity-50 font-mono">{{ project.role }} · {{ project.realization_date }}</p>

        <img *ngIf="project.cover_image" [src]="img(project.cover_image)" class="img-fluid rounded-4 my-4 detail-cover" style="max-height:420px;width:100%;object-fit:cover;">

        <div class="d-flex flex-wrap gap-2 mb-4">
          <a *ngIf="project.demo_url" [href]="project.demo_url" target="_blank" class="btn btn-accent"><i class="bi bi-eye me-1"></i>Voir la démonstration</a>
          <a *ngIf="project.github_url" [href]="project.github_url" target="_blank" class="btn btn-outline-secondary"><i class="bi bi-github me-1"></i>Code source</a>
          <a *ngIf="project.download_url" [href]="project.download_url" target="_blank" (click)="registerDownload()" class="btn btn-outline-secondary"><i class="bi bi-download me-1"></i>Télécharger</a>
        </div>

        <p class="lead" style="white-space: pre-line;">{{ project.full_description }}</p>

        <div class="mt-4">
          <span class="badge bg-accent-soft text-accent me-1" *ngFor="let t of techs()">{{ t }}</span>
        </div>

        <div class="row g-3 mt-4" *ngIf="galleryUrls().length">
          <h5 class="section-title">Galerie du projet</h5>
          <div class="col-md-4" *ngFor="let g of galleryUrls(); let i = index" appReveal [revealDelay]="i * 90">
            <img [src]="img(g)" class="img-fluid rounded shadow-sm">
          </div>
        </div>

        <div class="ratio ratio-16x9 mt-4" *ngIf="project.video_url && !isVideoFile(project.video_url)">
          <iframe [src]="safeVideo()" allowfullscreen></iframe>
        </div>
        <div class="mt-4" *ngIf="project.video_url && isVideoFile(project.video_url)">
          <video [src]="img(project.video_url)" controls class="w-100 rounded shadow-sm" style="max-height:480px;"></video>
        </div>
      </div>
    </section>
    <p *ngIf="!project" class="text-center py-5 opacity-50">Chargement du projet…</p>
  `,
  styles: [`
    .back-link {
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: .9rem;
      transition: color .2s ease;
    }
    .back-link:hover { color: var(--accent-2); }
    .detail-cover {
      border: 1px solid var(--card-border);
      box-shadow: 0 20px 45px var(--shadow-color);
    }
  `],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.get(id).subscribe({ next: (p) => (this.project = p), error: () => {} });
  }

  techs(): string[] {
    return (this.project?.technologies || '').split(',').map((t) => t.trim()).filter(Boolean);
  }

  galleryUrls(): string[] {
    return (this.project?.gallery_images || '').split(',').map((g) => g.trim()).filter(Boolean);
  }

  img(url: string): string {
    return url;
  }

  isVideoFile(url: string): boolean {
    return /\.(mp4|webm|ogg|mov)$/i.test(url || '');
  }

  safeVideo(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.project?.video_url || '');
  }

  registerDownload(): void {
    if (this.project?.id) {
      this.projectService.registerDownload(this.project.id).subscribe({ error: () => {} });
    }
  }
}
