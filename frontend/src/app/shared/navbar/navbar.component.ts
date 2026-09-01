import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg sticky-top glass-nav">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">
          <span class="text-gradient">&lt;/&gt;</span> Portfolio
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li class="nav-item"><a class="nav-link" routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:true}">Accueil</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/about" routerLinkActive="active-link">À propos</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/skills" routerLinkActive="active-link">Compétences</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/services" routerLinkActive="active-link">Services</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/projects" routerLinkActive="active-link">Projets</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/certifications" routerLinkActive="active-link">Certifications</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/gallery" routerLinkActive="active-link">Galerie</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/contact" routerLinkActive="active-link">Contact</a></li>
            <li class="nav-item ms-lg-2">
              <button class="btn btn-sm theme-toggle rounded-circle" (click)="toggleTheme()" title="Changer le thème">
                <i class="bi" [class.bi-moon-stars]="!isDark" [class.bi-sun]="isDark"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .glass-nav {
      background-color: var(--nav-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      transition: background-color .4s ease, border-color .4s ease;
      padding: .65rem 0;
    }
    .navbar-brand {
      font-family: var(--font-display);
      color: var(--text-color);
      letter-spacing: -.01em;
      display: flex;
      align-items: center;
      gap: .4rem;
    }
    .nav-link {
      color: var(--text-muted);
      font-weight: 500;
      position: relative;
      margin: 0 .35rem;
      transition: color .25s ease;
    }
    .nav-link::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0;
      height: 2px;
      background: var(--gradient);
      border-radius: 2px;
      transition: width .25s ease;
    }
    .nav-link:hover { color: var(--text-color); }
    .nav-link:hover::after { width: 100%; }
    .nav-link.active-link {
      color: var(--text-color);
      font-weight: 600;
    }
    .nav-link.active-link::after { width: 100%; }
    .theme-toggle {
      width: 38px;
      height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-color);
      color: var(--text-color);
      background: transparent;
      transition: transform .3s ease, border-color .3s ease, background-color .3s ease;
    }
    .theme-toggle:hover {
      transform: rotate(20deg);
      border-color: var(--accent);
      background: var(--accent-soft);
    }
  `],
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
