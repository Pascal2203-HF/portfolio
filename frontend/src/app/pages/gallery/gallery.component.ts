import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../core/services/api.service';
import { GalleryItem } from '../../core/models/models';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Galerie</h2>
        <div class="row g-3">
          <div class="col-md-4" *ngFor="let g of items">
            <div class="app-card overflow-hidden p-0">
              <img *ngIf="g.media_type === 'image'" [src]="img(g.url)" class="w-100" style="height:220px;object-fit:cover;">
              <video *ngIf="g.media_type === 'video'" [src]="img(g.url)" controls class="w-100" style="height:220px;object-fit:cover;"></video>
              <p class="p-2 mb-0 small text-center">{{ g.title }}</p>
            </div>
          </div>
          <p *ngIf="items.length === 0" class="opacity-50">Aucun média dans la galerie.</p>
        </div>
      </div>
    </section>
  `,
})
export class GalleryComponent implements OnInit {
  items: GalleryItem[] = [];
  constructor(private galleryService: GalleryService) {}
  ngOnInit(): void {
    this.galleryService.list().subscribe({ next: (g) => (this.items = g), error: () => {} });
  }
  img(url: string): string {
    return url.startsWith('http') ? url : `http://localhost:8000${url}`;
  }
}
