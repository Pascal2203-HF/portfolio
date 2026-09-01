import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/api.service';
import { Project } from '../../core/models/models';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-projects', standalone: true, imports: [CommonModule, RouterLink, RevealDirective],
  template: `
    <section class="section">
      <div class="container">
        <div class="project-heading">
          <div>
            <p class="eyebrow mb-2">Sélection de réalisations</p>
            <h1 class="section-title mb-2">Des projets conçus pour résoudre des besoins réels.</h1>
            <p class="opacity-75 mb-0">Découvrez une sélection d’applications web et desktop que j’ai réalisées.</p>
          </div>
          <div class="project-count"><strong>{{ filteredProjects.length }}</strong><span>projets</span></div>
        </div>
        <div class="filter-bar" aria-label="Filtrer les projets">
          <button type="button" class="filter-chip" [class.active]="activeFilter === 'Tous'" (click)="setFilter('Tous')">Tous</button>
          <button type="button" class="filter-chip" *ngFor="let tech of filters" [class.active]="activeFilter === tech" (click)="setFilter(tech)">{{ tech }}</button>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let p of filteredProjects; let i = index" appReveal [revealDelay]="(i % 3) * 100">
            <article class="app-card project-card h-100">
              <div class="project-image-wrap">
                <img *ngIf="p.cover_image" [src]="p.cover_image" [alt]="'Aperçu du projet ' + p.title" class="project-image">
                <div *ngIf="!p.cover_image" class="d-flex align-items-center justify-content-center bg-accent-soft project-image"><i class="bi bi-code-square text-accent" style="font-size:2.5rem;"></i></div>
                <span class="project-year">{{ p.realization_date }}</span>
              </div>
              <div class="p-4 d-flex flex-column flex-grow-1">
                <p class="small font-mono text-accent mb-2">{{ p.role }}</p>
                <h3 class="h5 mb-2">{{ p.title }}</h3>
                <p class="opacity-75 small mb-3">{{ p.short_description }}</p>
                <div class="mt-auto d-flex align-items-end justify-content-between gap-2">
                  <div class="tech-list"><span *ngFor="let t of techs(p).slice(0, 2)">{{ t }}</span></div>
                  <a [routerLink]="['/projects', p.id]" class="project-link" [attr.aria-label]="'Voir le détail de ' + p.title"><i class="bi bi-arrow-up-right"></i></a>
                </div>
              </div>
            </article>
          </div>
          <p *ngIf="filteredProjects.length === 0" class="opacity-50">Aucun projet pour ce filtre.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .project-heading { display:flex; justify-content:space-between; align-items:end; gap:2rem; margin-bottom:2rem; }
    .project-heading .section-title { max-width:720px; }
    .project-count { min-width:100px; padding:1rem; text-align:center; border:1px solid var(--card-border); border-radius:16px; background:var(--card-bg); }
    .project-count strong { display:block; font:700 2rem var(--font-display); color:var(--accent); line-height:1; }.project-count span { font-size:.75rem; color:var(--text-muted); }
    .filter-bar { display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:2rem; }.filter-chip { border:1px solid var(--border-color); border-radius:999px; padding:.5rem 1rem; background:var(--card-bg); color:var(--text-muted); font-weight:600; transition:.2s ease; }.filter-chip:hover,.filter-chip.active { background:var(--gradient); border-color:transparent; color:white; }
    .project-card { overflow:hidden; display:flex; flex-direction:column; }.project-image-wrap { height:220px; position:relative; overflow:hidden; background:var(--accent-soft); }.project-image { width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }.project-card:hover .project-image { transform:scale(1.06); }.project-year { position:absolute; right:1rem; bottom:1rem; padding:.35rem .6rem; border-radius:8px; background:rgba(6,8,20,.75); color:#fff; font:500 .75rem var(--font-mono); }.tech-list { display:flex; gap:.35rem; flex-wrap:wrap; }.tech-list span { color:var(--text-muted); font-size:.72rem; }.tech-list span:not(:last-child)::after { content:'·'; margin-left:.35rem; }.project-link { width:38px; height:38px; flex:0 0 auto; display:grid; place-items:center; border-radius:50%; color:#fff; background:var(--gradient); transition:transform .2s ease; }.project-link:hover { color:#fff; transform:translate(2px,-2px); }
    @media (max-width:575px) { .project-heading { align-items:start; flex-direction:column; gap:1rem; }.project-count { display:flex; align-items:baseline; gap:.4rem; min-width:auto; padding:.5rem .75rem; } .project-count strong { font-size:1.3rem; } }
  `],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = []; activeFilter = 'Tous'; readonly filters = ['Java', 'Angular', 'PHP', 'JavaScript'];
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void { this.projectService.list().subscribe((projects) => this.projects = projects); }
  get filteredProjects(): Project[] { return this.activeFilter === 'Tous' ? this.projects : this.projects.filter((project) => this.techs(project).includes(this.activeFilter)); }
  setFilter(filter: string): void { this.activeFilter = filter; }
  techs(project: Project): string[] { return (project.technologies || '').split(',').map((tech) => tech.trim()).filter(Boolean); }
}
