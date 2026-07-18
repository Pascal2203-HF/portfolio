import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../core/services/api.service';
import { Education } from '../../core/models/models';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Formation</h2>
        <div class="app-card p-4" *ngFor="let e of items" style="margin-bottom: 1rem;">
          <div class="d-flex justify-content-between flex-wrap">
            <h5>{{ e.degree }} — {{ e.school }}</h5>
            <span class="opacity-50">{{ e.start_year }} - {{ e.end_year }}</span>
          </div>
          <p class="opacity-75 mb-0">{{ e.description }}</p>
        </div>
        <p *ngIf="items.length === 0" class="opacity-50">Aucune formation renseignée.</p>
      </div>
    </section>
  `,
})
export class EducationComponent implements OnInit {
  items: Education[] = [];
  constructor(private educationService: EducationService) {}
  ngOnInit(): void {
    this.educationService.list().subscribe({ next: (e) => (this.items = e), error: () => {} });
  }
}
