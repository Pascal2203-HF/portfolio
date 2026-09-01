import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

/**
 * appReveal — fait apparaître un élément (fade + slide-up) lorsqu'il entre dans le viewport.
 * Usage: <div appReveal [revealDelay]="i * 80">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal-init');
    node.style.transitionDelay = `${this.revealDelay}ms`;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('reveal-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('reveal-visible');
            this.observer?.unobserve(node);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
