import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'portfolio-theme';

  init(): void {
    const saved = localStorage.getItem(this.key) || 'light';
    this.apply(saved);
  }

  toggle(): void {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    this.apply(next);
    localStorage.setItem(this.key, next);
  }

  isDark(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  private apply(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
