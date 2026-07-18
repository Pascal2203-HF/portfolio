import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/api.service';
import { Profile } from '../../core/models/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">À propos de moi</h2>
        <div class="row gy-4">
          <div class="col-lg-4 text-center">
            <img *ngIf="profile?.photo_url" [src]="img(profile!.photo_url)" class="img-fluid rounded-4 shadow" alt="Photo">
          </div>
          <div class="col-lg-8">
            <h4 class="text-accent">{{ profile?.title }}</h4>
            <p class="lead opacity-90" style="white-space: pre-line;">{{ profile?.about_text }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnInit {
  profile: Profile | null = null;
  constructor(private profileService: ProfileService) {}
  ngOnInit(): void {
    this.profileService.get().subscribe({ next: (p) => (this.profile = p), error: () => {} });
  }
  img(url: string): string {
    return url.startsWith('http') ? url : `http://localhost:8000${url}`;
  }
}
