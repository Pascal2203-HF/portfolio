import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService, ProjectService } from '../../core/services/api.service';
import { Profile, Project } from '../../core/models/models';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { cvUrl } from '../../core/portfolio.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  template: `
    <section class="section hero-section">
      <div class="container py-5">
        <div class="row align-items-center gy-5">
          <div class="col-lg-7">
            <p class="eyebrow mb-3">Bienvenue sur mon portfolio</p>
            <h1 class="display-4 fw-bold mb-3 text-gradient">{{ profile?.full_name || 'Votre Nom' }}</h1>
            <h3 class="opacity-75 mb-3 fw-medium terminal-line">
              <span class="prompt">&gt;</span> {{ typedTitle }}<span class="typing-cursor" [class.d-none]="typingDone">&nbsp;</span>
            </h3>
            <p class="lead mb-4 opacity-75">{{ profile?.short_bio }}</p>
            <div class="d-flex flex-wrap gap-3">
              <a routerLink="/projects" class="btn btn-accent btn-lg px-4">Voir mes projets</a>
              <a [href]="cvUrl" download class="btn btn-outline-secondary btn-lg px-4"><i class="bi bi-download me-1"></i>Télécharger mon CV</a>
              <a routerLink="/contact" class="btn btn-outline-secondary btn-lg px-4">Me contacter</a>
            </div>
          </div>
          <div class="col-lg-5 text-center">
            <div class="avatar-ring">
              <img *ngIf="profile?.photo_url" [src]="photoUrl()" class="img-fluid rounded-circle hero-photo" alt="Photo de profil">
              <div *ngIf="!profile?.photo_url" class="rounded-circle bg-accent d-flex align-items-center justify-content-center mx-auto hero-photo-placeholder">
                <i class="bi bi-person-fill text-white" style="font-size: 6rem;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="eyebrow mb-2">Derniers travaux</p>
        <h2 class="section-title">Projets récents</h2>
        <div class="row g-4">
          <div class="col-md-4" *ngFor="let p of recentProjects; let i = index" appReveal [revealDelay]="i * 100">
            <div class="app-card h-100 p-3">
              <img *ngIf="p.cover_image" [src]="img(p.cover_image)" class="rounded mb-3" style="width:100%;height:180px;object-fit:cover;">
              <h5>{{ p.title }}</h5>
              <p class="opacity-75 small">{{ p.short_description }}</p>
              <a [routerLink]="['/projects', p.id]" class="btn btn-sm btn-accent">Voir le projet</a>
            </div>
          </div>
          <p *ngIf="recentProjects.length === 0" class="opacity-50">Aucun projet publié pour le moment.</p>
        </div>
        <div class="text-center mt-4">
          <a routerLink="/projects" class="btn btn-outline-secondary">Voir tous les projets</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section { padding-top: 40px; }
    .terminal-line {
      font-family: var(--font-mono);
      font-size: 1.25rem;
    }
    .prompt { color: var(--accent-2); }
    .hero-photo {
      max-width: 300px;
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border: 3px solid var(--card-bg);
    }
    .hero-photo-placeholder {
      width: 260px;
      height: 260px;
      border: 3px solid var(--card-bg);
    }
  `],
})
export class HomeComponent implements OnInit, OnDestroy {
  cvUrl = cvUrl;
  profile: Profile | null = null;
  recentProjects: Project[] = [];

  typedTitle = '';
  typingDone = false;
  private fullTitle = '';
  private typeTimer?: ReturnType<typeof setInterval>;

  constructor(private profileService: ProfileService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.profileService.get().subscribe({
      next: (p) => {
        this.profile = p;
        this.fullTitle = p?.title || 'Développeur';
        this.startTyping();
      },
      error: () => {
        this.fullTitle = 'Développeur';
        this.startTyping();
      },
    });
    this.projectService.list().subscribe({
      next: (list) => (this.recentProjects = list.slice(0, 3)),
      error: () => {},
    });
  }

  private startTyping(): void {
    let i = 0;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.typedTitle = this.fullTitle;
      this.typingDone = true;
      return;
    }
    this.typeTimer = setInterval(() => {
      i++;
      this.typedTitle = this.fullTitle.slice(0, i);
      if (i >= this.fullTitle.length) {
        this.typingDone = true;
        if (this.typeTimer) clearInterval(this.typeTimer);
      }
    }, 45);
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearInterval(this.typeTimer);
  }

  photoUrl(): string {
    return this.profile?.photo_url || '';
  }

  img(url: string): string {
    return url;
  }
}
