import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/api.service';
import { Profile } from '../../core/models/models';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow mb-2">Qui suis-je</p>
        <h2 class="section-title">À propos de moi</h2>
        <div class="row gy-4 align-items-center">
          <div class="col-lg-4 text-center" appReveal>
            <img *ngIf="profile?.photo_url" [src]="img(profile!.photo_url)" class="img-fluid rounded-4 about-photo" alt="Photo">
          </div>
          <div class="col-lg-8" appReveal [revealDelay]="120">
            <div class="app-card p-4">
              <h4 class="text-accent">{{ profile?.title }}</h4>
              <p class="lead opacity-90" style="white-space: pre-line;">{{ profile?.about_text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-photo {
      box-shadow: 0 20px 45px var(--shadow-color);
      border: 1px solid var(--card-border);
    }
  `],
})
export class AboutComponent implements OnInit {
  profile: Profile | null = null;
  constructor(private profileService: ProfileService) {}
  ngOnInit(): void {
    this.profileService.get().subscribe({ next: (p) => (this.profile = p), error: () => {} });
  }
  img(url: string): string {
    return url;
  }
}
