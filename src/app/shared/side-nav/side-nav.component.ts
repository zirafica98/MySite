import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      <div *ngFor="let section of sections"
           class="relative group flex items-center justify-end">

        <!-- Tooltip label -->
        <span class="absolute right-8 whitespace-nowrap text-xs font-semibold uppercase tracking-widest
                     px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white
                     opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
                     transition-all duration-200 pointer-events-none shadow-lg">
          {{ section.label }}
        </span>

        <!-- Dot -->
        <button
          (click)="scrollTo(section.id)"
          [attr.aria-label]="section.label"
          class="relative flex items-center justify-center transition-all duration-300 rounded-full focus:outline-none"
          [class]="activeSection() === section.id
            ? 'w-4 h-4 bg-primary-500 shadow-lg shadow-primary-500/50 ring-2 ring-primary-300'
            : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400 hover:scale-125'">
        </button>
      </div>
    </nav>
  `,
  styles: []
})
export class SideNavComponent implements OnInit, OnDestroy {
  activeSection = signal<string>('hero');

  sections: NavSection[] = [
    { id: 'hero',       label: 'Home'       },
    { id: 'about',      label: 'About'      },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects'   },
    { id: 'contact',    label: 'Contact'    },
  ];

  private observer!: IntersectionObserver;

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      }
    );

    // Wait for DOM to be ready
    setTimeout(() => {
      this.sections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el) this.observer.observe(el);
      });
    }, 300);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
