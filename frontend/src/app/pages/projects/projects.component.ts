import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/api.service';
import { Project } from '../../core/models/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Mes projets</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let p of projects">
            <div class="app-card h-100 p-3">
              <img *ngIf="p.cover_image" [src]="img(p.cover_image)" class="rounded mb-3" style="width:100%;height:190px;object-fit:cover;">
              <div *ngIf="!p.cover_image" class="rounded mb-3 d-flex align-items-center justify-content-center bg-accent-soft" style="height:190px;">
                <i class="bi bi-code-square text-accent" style="font-size:2.5rem;"></i>
              </div>
              <h5>{{ p.title }}</h5>
              <p class="opacity-75 small">{{ p.short_description }}</p>
              <p class="small">
                <span class="badge bg-accent-soft text-accent me-1" *ngFor="let t of techs(p)">{{ t }}</span>
              </p>
              <a [routerLink]="['/projects', p.id]" class="btn btn-sm btn-accent">Voir le détail</a>
            </div>
          </div>
          <p *ngIf="projects.length === 0" class="opacity-50">Aucun projet publié pour le moment.</p>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void {
    this.projectService.list().subscribe({ next: (p) => (this.projects = p), error: () => {} });
  }
  techs(p: Project): string[] {
    return (p.technologies || '').split(',').map((t) => t.trim()).filter(Boolean);
  }
  img(url: string): string {
    return url.startsWith('http') ? url : `http://localhost:8000${url}`;
  }
}
