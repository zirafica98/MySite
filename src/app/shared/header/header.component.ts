import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="sticky top-0 z-50 transition-all duration-300"
            [class]="scrolled
              ? 'bg-beige-50/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800'
              : 'bg-beige-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800'">
      <nav class="container mx-auto px-3 md:px-4 py-2 md:py-4">
        <div class="flex items-center justify-between">

          <!-- Logo -->
          <a (click)="goHome()" class="flex items-center cursor-pointer">
            <!-- Mobile: text logo -->
            <div class="md:hidden flex flex-col leading-none py-1">
              <span class="font-black text-lg text-gray-900 dark:text-white tracking-tight">Mihajlo <span class="text-primary-500">Petrovic</span></span>
              <span class="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-0.5">Software Engineer</span>
            </div>
            <!-- Desktop: image logo -->
            <img src="assets/logov2-removebg-preview.png" alt="Mihajlo Petrovic" class="hidden md:block h-20 md:h-28 w-auto object-contain">
          </a>

          <!-- Right: Nav + Theme + Burger -->
          <div class="flex items-center gap-1">

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-1 mr-2">
              <a (click)="goHome()" class="nav-link cursor-pointer">Home</a>
              <a (click)="scrollTo('about')" class="nav-link cursor-pointer">About</a>
              <a (click)="scrollTo('projects')" class="nav-link cursor-pointer">Projects</a>
              <a routerLink="/blog" routerLinkActive="text-primary-500 font-bold" class="nav-link">Blog</a>
              <a (click)="scrollTo('contact')" class="nav-link cursor-pointer">Contact</a>
            </div>

            <!-- Theme Toggle -->
            <button (click)="themeService.toggleTheme()"
                    class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle dark mode">
              <!-- Sun icon (shown in dark mode → click to go light) -->
              <svg *ngIf="themeService.isDarkMode()" class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <!-- Moon icon (shown in light mode → click to go dark) -->
              <svg *ngIf="!themeService.isDarkMode()" class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>

            <!-- Hamburger (mobile) -->
            <button (click)="mobileOpen.set(!mobileOpen())"
                    class="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle menu">
              <svg *ngIf="!mobileOpen()" class="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg *ngIf="mobileOpen()" class="w-6 h-6 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="mobileOpen()"
             class="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-1">
          <a (click)="goHome(); mobileOpen.set(false)"
             class="mobile-nav-link">Home</a>
          <a (click)="scrollTo('about'); mobileOpen.set(false)"
             class="mobile-nav-link">About</a>
          <a (click)="scrollTo('projects'); mobileOpen.set(false)"
             class="mobile-nav-link">Projects</a>
          <a routerLink="/blog" (click)="mobileOpen.set(false)"
             class="mobile-nav-link">Blog</a>
          <a (click)="scrollTo('contact'); mobileOpen.set(false)"
             class="mobile-nav-link">Contact</a>

          <!-- Divider -->
          <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>

          <!-- Theme Toggle -->
          <button (click)="themeService.toggleTheme()"
                  class="mobile-nav-link w-full text-left flex items-center justify-between">
            <span>{{ themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode' }}</span>
            <span class="flex items-center gap-2">
              <!-- Sun -->
              <svg *ngIf="themeService.isDarkMode()" class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <!-- Moon -->
              <svg *ngIf="!themeService.isDarkMode()" class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .nav-link {
      @apply px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400
             hover:bg-primary-50 dark:hover:bg-gray-800
             transition-all duration-200 font-medium text-sm uppercase tracking-wider;
    }
    .mobile-nav-link {
      @apply block w-full px-4 py-3 rounded-lg text-gray-800 dark:text-gray-200
             hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800
             transition-all duration-200 font-medium text-sm uppercase tracking-wider cursor-pointer;
    }
  `]
})
export class HeaderComponent {
  mobileOpen = signal(false);
  scrolled = false;

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }

  goHome() {
    this.mobileOpen.set(false);
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  async scrollTo(sectionId: string) {
    this.mobileOpen.set(false);

    const currentPath = this.router.url.split('?')[0].split('#')[0];

    if (currentPath !== '/') {
      await this.router.navigate(['/']);
      // Wait for Angular to finish rendering all home sections
      await this.delay(350);
    }

    this.performScroll(sectionId);
  }

  private performScroll(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      // Retry once after a short delay in case element is still being rendered
      setTimeout(() => {
        const retryEl = document.getElementById(sectionId);
        if (retryEl) {
          const headerOffset = 80;
          const top = retryEl.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 200);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
