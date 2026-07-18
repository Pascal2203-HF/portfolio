import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService, ProjectService } from '../../core/services/api.service';
import { Profile, Project } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section bg-accent-soft">
      <div class="container py-5">
        <div class="row align-items-center gy-4">
          <div class="col-lg-7">
            <p class="text-accent fw-semibold mb-2">Bienvenue sur mon portfolio</p>
            <h1 class="display-5 fw-bold mb-3">{{ profile?.full_name || 'Votre Nom' }}</h1>
            <h3 class="opacity-75 mb-3">{{ profile?.title }}</h3>
            <p class="lead mb-4">{{ profile?.short_bio }}</p>
            <div class="d-flex flex-wrap gap-3">
              <a routerLink="/projects" class="btn btn-accent btn-lg px-4">Voir mes projets</a>
              <a routerLink="/contact" class="btn btn-outline-secondary btn-lg px-4">Me contacter</a>
            </div>
          </div>
          <div class="col-lg-5 text-center">
            <img *ngIf="profile?.photo_url" [src]="photoUrl()" class="img-fluid rounded-circle shadow" style="max-width: 320px;" alt="Photo de profil">
            <div *ngIf="!profile?.photo_url" class="rounded-circle bg-accent d-flex align-items-center justify-content-center mx-auto" style="width:280px;height:280px;">
              <i class="bi bi-person-fill text-white" style="font-size: 6rem;"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Projets récents</h2>
        <div class="row g-4">
          <div class="col-md-4" *ngFor="let p of recentProjects">
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
})
export class HomeComponent implements OnInit {
  profile: Profile | null = null;
  recentProjects: Project[] = [];

  constructor(private profileService: ProfileService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.profileService.get().subscribe({ next: (p) => (this.profile = p), error: () => {} });
    this.projectService.list().subscribe({
      next: (list) => (this.recentProjects = list.slice(0, 3)),
      error: () => {},
    });
  }

  photoUrl(): string {
    const url = this.profile?.photo_url || '';
    return url.startsWith('http') ? url : `http://localhost:8000${url}`;
  }

  img(url: string): string {
    return url.startsWith('http') ? url : `http://localhost:8000${url}`;
  }
}
