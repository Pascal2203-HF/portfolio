import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../core/services/api.service';
import { Skill } from '../../core/models/models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Compétences techniques</h2>
        <div class="row g-4">
          <div class="col-md-6" *ngFor="let cat of categories()">
            <div class="app-card p-4 h-100">
              <h5 class="text-accent mb-3">{{ cat }}</h5>
              <div *ngFor="let s of byCategory(cat)" class="mb-3">
                <div class="d-flex justify-content-between">
                  <span>{{ s.name }}</span>
                  <span class="opacity-50">{{ s.level }}%</span>
                </div>
                <div class="progress" style="height:8px; background: var(--border-color);">
                  <div class="progress-bar-skill" [style.width.%]="s.level"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  constructor(private skillService: SkillService) {}
  ngOnInit(): void {
    this.skillService.list().subscribe({ next: (s) => (this.skills = s), error: () => {} });
  }
  categories(): string[] {
    return Array.from(new Set(this.skills.map((s) => s.category)));
  }
  byCategory(cat: string): Skill[] {
    return this.skills.filter((s) => s.category === cat);
  }
}
