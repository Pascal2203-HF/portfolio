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
    <footer class="mt-5 pt-5 pb-4 glass-footer">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-4">
            <h5 class="text-gradient fw-bold">{{ profile?.full_name || 'Portfolio' }}</h5>
            <p class="opacity-75">{{ profile?.short_bio }}</p>
          </div>
          <div class="col-md-4">
            <h6 class="eyebrow mb-3">Liens rapides</h6>
            <ul class="list-unstyled footer-links">
              <li><a routerLink="/about">À propos</a></li>
              <li><a routerLink="/projects">Projets</a></li>
              <li><a routerLink="/contact">Contact</a></li>
              <li><a routerLink="/admin/login" class="opacity-50">Administration</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6 class="eyebrow mb-3">Contact</h6>
            <p class="mb-1"><i class="bi bi-envelope me-2 text-accent"></i>{{ profile?.email }}</p>
            <p class="mb-1"><i class="bi bi-telephone me-2 text-accent"></i>{{ profile?.phone }}</p>
            <p class="mb-3"><i class="bi bi-geo-alt me-2 text-accent"></i>{{ profile?.location }}</p>
            <div class="d-flex gap-3 fs-5">
              <a *ngIf="profile?.github" [href]="profile?.github" target="_blank" class="social-icon"><i class="bi bi-github"></i></a>
              <a *ngIf="profile?.linkedin" [href]="profile?.linkedin" target="_blank" class="social-icon"><i class="bi bi-linkedin"></i></a>
              <a *ngIf="profile?.facebook" [href]="profile?.facebook" target="_blank" class="social-icon"><i class="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>
        <hr>
        <p class="text-center mb-0 opacity-50 small">&copy; {{ year }} {{ profile?.full_name || 'Portfolio' }}. Tous droits réservés.</p>
      </div>
    </footer>
  `,
  styles: [`
    .glass-footer {
      background-color: var(--card-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid var(--border-color);
      transition: background-color .4s ease, border-color .4s ease;
    }
    .footer-links li { margin-bottom: .5rem; }
    .footer-links a {
      color: var(--text-muted);
      transition: color .2s ease, padding-left .2s ease;
    }
    .footer-links a:hover {
      color: var(--accent-2);
      padding-left: 4px;
    }
    .social-icon {
      color: var(--text-color);
      width: 38px;
      height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      transition: transform .25s ease, color .25s ease, border-color .25s ease;
    }
    .social-icon:hover {
      transform: translateY(-3px);
      color: var(--accent-2);
      border-color: var(--accent-2);
    }
    hr { border-color: var(--border-color); opacity: 1; }
  `],
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
