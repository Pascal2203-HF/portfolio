import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { StatsService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="aurora-bg" aria-hidden="true">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="grain"></div>
    </div>
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class AppComponent implements OnInit {
  constructor(private theme: ThemeService, private stats: StatsService) {}

  ngOnInit(): void {
    this.theme.init();
    this.stats.recordVisit(window.location.pathname).subscribe({ error: () => {} });
  }
}
