import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificationService } from '../../core/services/api.service';
import { Certification } from '../../core/models/models';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Certifications</h2>
        <div class="row g-4">
          <div class="col-md-4" *ngFor="let c of items">
            <div class="app-card h-100 p-3 text-center">
              <img *ngIf="c.image_url" [src]="img(c.image_url)" class="rounded mb-3" style="width:100%;height:160px;object-fit:cover;">
              <h6>{{ c.title }}</h6>
              <p class="opacity-75 small mb-1">{{ c.organization }}</p>
              <p class="opacity-50 small">{{ c.date_obtained }}</p>
              <a *ngIf="c.certificate_url" [href]="c.certificate_url" target="_blank" class="btn btn-sm btn-outline-secondary">Voir le certificat</a>
            </div>
          </div>
          <p *ngIf="items.length === 0" class="opacity-50">Aucune certification renseignée.</p>
        </div>
      </div>
    </section>
  `,
})
export class CertificationsComponent implements OnInit {
  items: Certification[] = [];
  constructor(private certService: CertificationService) {}
  ngOnInit(): void {
    this.certService.list().subscribe({ next: (c) => (this.items = c), error: () => {} });
  }
  img(url: string): string {
    return url.startsWith('http') ? url : `http://localhost:8000${url}`;
  }
}
