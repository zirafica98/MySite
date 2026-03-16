import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  current: number;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-gray-100 dark:bg-gray-900 py-16 border-y border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <div *ngFor="let stat of stats"
               class="text-center group">
            <!-- Icon -->
            <div class="text-3xl mb-3">{{ stat.icon }}</div>
            <!-- Number -->
            <div class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-1">
              {{ stat.current }}<span class="text-primary-500">{{ stat.suffix }}</span>
            </div>
            <!-- Label -->
            <p class="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-widest">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class StatsComponent implements OnInit, OnDestroy {
  stats: Stat[] = [
    { value: 5, suffix: '+', label: 'Years Experience', icon: '🧑‍💻', current: 0 },
    { value: 20, suffix: '+', label: 'Projects Shipped', icon: '🚀', current: 0 },
    { value: 3, suffix: '', label: 'Countries Deployed', icon: '🌍', current: 0 },
    { value: 3000, suffix: '+', label: 'Monthly Users', icon: '👥', current: 0 },
  ];

  private observer?: IntersectionObserver;
  private animated = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animated = true;
          this.animateAll();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private animateAll() {
    this.stats.forEach((stat, i) => {
      setTimeout(() => this.animateStat(stat), i * 150);
    });
  }

  private animateStat(stat: Stat) {
    const duration = 1800;
    const steps = 60;
    const increment = stat.value / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out: starts fast, slows at end
      const progress = 1 - Math.pow(1 - step / steps, 3);
      stat.current = Math.round(progress * stat.value);

      if (step >= steps) {
        stat.current = stat.value;
        clearInterval(timer);
      }
    }, duration / steps);
  }
}
