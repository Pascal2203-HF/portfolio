import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/api.service';
import { Profile } from '../../core/models/models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="mt-5 pt-5 pb-4" style="background-color: var(--card-bg); border-top: 1px solid var(--border-color);">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-4">
            <h5 class="text-accent fw-bold">{{ profile?.full_name || 'Portfolio' }}</h5>
            <p class="opacity-75">{{ profile?.short_bio }}</p>
          </div>
          <div class="col-md-4">
            <h6 class="fw-bold mb-3">Liens rapides</h6>
            <ul class="list-unstyled">
              <li><a routerLink="/about" class="text-decoration-none">À propos</a></li>
              <li><a routerLink="/projects" class="text-decoration-none">Projets</a></li>
              <li><a routerLink="/contact" class="text-decoration-none">Contact</a></li>
              <li><a routerLink="/admin/login" class="text-decoration-none opacity-50">Administration</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6 class="fw-bold mb-3">Contact</h6>
            <p class="mb-1"><i class="bi bi-envelope me-2"></i>{{ profile?.email }}</p>
            <p class="mb-1"><i class="bi bi-telephone me-2"></i>{{ profile?.phone }}</p>
            <p class="mb-3"><i class="bi bi-geo-alt me-2"></i>{{ profile?.location }}</p>
            <div class="d-flex gap-3 fs-5">
              <a *ngIf="profile?.github" [href]="profile?.github" target="_blank" class="text-accent"><i class="bi bi-github"></i></a>
              <a *ngIf="profile?.linkedin" [href]="profile?.linkedin" target="_blank" class="text-accent"><i class="bi bi-linkedin"></i></a>
              <a *ngIf="profile?.facebook" [href]="profile?.facebook" target="_blank" class="text-accent"><i class="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>
        <hr>
        <p class="text-center mb-0 opacity-50 small">&copy; {{ year }} {{ profile?.full_name || 'Portfolio' }}. Tous droits réservés.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent implements OnInit {
  profile: Profile | null = null;
  year = new Date().getFullYear();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.get().subscribe({
      next: (p) => (this.profile = p),
      error: () => {},
    });
  }
}
