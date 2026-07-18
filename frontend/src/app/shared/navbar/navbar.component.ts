import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg sticky-top" style="background-color: var(--bg-color); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <a class="navbar-brand fw-bold text-accent" routerLink="/">Portfolio</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li class="nav-item"><a class="nav-link" routerLink="/" routerLinkActive="text-accent" [routerLinkActiveOptions]="{exact:true}">Accueil</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/about" routerLinkActive="text-accent">À propos</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/skills" routerLinkActive="text-accent">Compétences</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/services" routerLinkActive="text-accent">Services</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/projects" routerLinkActive="text-accent">Projets</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/certifications" routerLinkActive="text-accent">Certifications</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/gallery" routerLinkActive="text-accent">Galerie</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/contact" routerLinkActive="text-accent">Contact</a></li>
            <li class="nav-item ms-lg-2">
              <button class="btn btn-sm btn-outline-secondary rounded-circle" (click)="toggleTheme()" title="Changer le thème">
                <i class="bi" [class.bi-moon-stars]="!isDark" [class.bi-sun]="isDark"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  isDark = false;

  constructor(private theme: ThemeService) {
    this.isDark = this.theme.isDark();
  }

  toggleTheme(): void {
    this.theme.toggle();
    this.isDark = this.theme.isDark();
  }
}
