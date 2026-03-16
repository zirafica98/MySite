import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

export type AnimateOnScrollEffect =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'fade';

@Directive({
  selector: '[animateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  /** Animation style. Defaults to 'fade-up'. */
  @Input('animateOnScroll') effect: AnimateOnScrollEffect = 'fade-up';

  /** Delay in ms before the animation starts (for staggered groups). */
  @Input() animDelay = 0;

  /** Duration in ms. */
  @Input() animDuration = 600;

  /** How much of the element must be visible to trigger (0–1). */
  @Input() animThreshold = 0.15;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const el = this.el.nativeElement as HTMLElement;

    // Initial hidden state
    this.setInitial(el);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => this.reveal(el), this.animDelay);
            this.observer?.unobserve(el); // fire once
          }
        });
      },
      { threshold: this.animThreshold, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setInitial(el: HTMLElement) {
    el.style.transition = `opacity ${this.animDuration}ms ease, transform ${this.animDuration}ms ease`;
    el.style.opacity = '0';

    switch (this.effect) {
      case 'fade-up':    el.style.transform = 'translateY(40px)'; break;
      case 'fade-down':  el.style.transform = 'translateY(-40px)'; break;
      case 'fade-left':  el.style.transform = 'translateX(40px)'; break;
      case 'fade-right': el.style.transform = 'translateX(-40px)'; break;
      case 'zoom-in':    el.style.transform = 'scale(0.9)'; break;
      case 'fade':       el.style.transform = 'none'; break;
    }
  }

  private reveal(el: HTMLElement) {
    el.style.opacity = '1';
    el.style.transform = 'none';
  }
}
