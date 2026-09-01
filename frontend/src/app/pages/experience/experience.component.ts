import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../core/services/api.service';
import { Experience } from '../../core/models/models';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow mb-2">Parcours professionnel</p>
        <h2 class="section-title">Expériences</h2>
        <div class="app-card p-4 timeline-item" *ngFor="let e of items; let i = index" appReveal [revealDelay]="i * 90" style="margin-bottom: 1rem;">
          <div class="d-flex justify-content-between flex-wrap">
            <h5>{{ e.role }} — {{ e.company }}</h5>
            <span class="opacity-50 font-mono small">{{ e.start_date }} → {{ e.end_date || 'Présent' }}</span>
          </div>
          <p class="opacity-75 mb-0">{{ e.description }}</p>
        </div>
        <p *ngIf="items.length === 0" class="opacity-50">Aucune expérience renseignée.</p>
      </div>
    </section>
  `,
})
export class ExperienceComponent implements OnInit {
  items: Experience[] = [];
  constructor(private experienceService: ExperienceService) {}
  ngOnInit(): void {
    this.experienceService.list().subscribe({ next: (e) => (this.items = e), error: () => {} });
  }
}
