import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItemService } from '../../core/services/api.service';
import { Service } from '../../core/models/models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Mes services</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" *ngFor="let s of services">
            <div class="app-card h-100 p-4 text-center">
              <i class="bi {{ s.icon }} text-accent" style="font-size: 2.5rem;"></i>
              <h5 class="mt-3">{{ s.title }}</h5>
              <p class="opacity-75 small">{{ s.description }}</p>
            </div>
          </div>
          <p *ngIf="services.length === 0" class="opacity-50">Aucun service renseigné pour le moment.</p>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  constructor(private serviceItemService: ServiceItemService) {}
  ngOnInit(): void {
    this.serviceItemService.list().subscribe({ next: (s) => (this.services = s), error: () => {} });
  }
}
