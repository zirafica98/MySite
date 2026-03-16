import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <section id="hero" class="relative min-h-screen flex items-center justify-center bg-beige-100 dark:bg-gray-950 overflow-hidden transition-colors duration-300">

      <!-- Orange Accent Shape -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]
                  bg-primary-500 transform rotate-45 translate-x-1/4 -translate-y-1/4 opacity-20 dark:opacity-10 z-0"></div>

      <!-- Main Content -->
      <div class="relative z-20 container mx-auto px-4 py-12 md:py-20">
        <div class="flex flex-col md:flex-row items-center justify-between min-h-[80vh] md:min-h-[90vh] gap-4 md:gap-12">

          <!-- Mobile image — visible only on small screens, above the text -->
          <div @fadeInUp class="md:hidden relative z-40 w-full flex justify-center">
            <div class="mobile-img-wrap">
              <img src="assets/largeImage.png" alt="Mihajlo Petrovic"
                   class="mobile-img dark:brightness-90">
            </div>
          </div>

          <!-- Left: Text -->
          <div @fadeIn class="relative z-30 flex-1 md:flex-none md:w-1/2 text-left">
            <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black leading-[0.9] text-left">
              <span class="block text-gray-900 dark:text-white">I AM A</span>
              <span class="block text-gray-900 dark:text-white">SOFTWARE</span>
              <span class="block stroke-text relative -mt-1 md:-mt-4 lg:-mt-6">ENGINEER</span>
            </h1>

            <p class="text-base md:text-xl text-gray-600 dark:text-gray-400 mt-6 md:mt-8 font-light">
              Web & Mobile Solutions — AI, FinTech, SwiftUI
            </p>

            <div class="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8 justify-start">
              <button (click)="scrollTo('projects')"
                 class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold
                        hover:bg-primary-500 dark:hover:bg-primary-500 dark:hover:text-white transition-colors text-sm md:text-base">
                My Projects
              </button>
              <button (click)="scrollTo('contact')"
                 class="bg-primary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors text-sm md:text-base">
                Contact Me
              </button>
            </div>
          </div>

          <!-- Right: Image — visible md+ -->
          <div @fadeInUp class="hidden md:flex relative z-40 flex-1 md:flex-none md:w-1/2 justify-center md:justify-end">
            <div class="relative overflow-hidden" style="width: 100%; max-width: 800px; height: 900px; clip-path: inset(0 0 30% 0);">
              <img src="assets/largeImage.png" alt="Mihajlo Petrovic"
                   class="w-full h-auto object-contain dark:brightness-90"
                   style="object-position: center top; display: block; transform: scale(1.2);">
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div @fadeIn class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-40">
          <div class="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full border-2 border-gray-400 dark:border-gray-600"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">
              Scroll Down
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stroke-text {
      -webkit-text-stroke: 5px #9ca3af;
      -webkit-text-fill-color: transparent;
      position: relative;
    }
    :host-context(.dark) .stroke-text {
      -webkit-text-stroke: 5px #6b7280;
    }
    @media (max-width: 1024px) { .stroke-text { -webkit-text-stroke: 4px #9ca3af; } }
    @media (max-width: 768px)  { .stroke-text { -webkit-text-stroke: 3px #9ca3af; } }
    @media (max-width: 640px)  {
      .stroke-text { -webkit-text-stroke: 2.5px #6b7280; }
    }
    @media (max-width: 400px)  { .stroke-text { -webkit-text-stroke: 2px #6b7280; } }
    /* Dark mode mobile — brighter stroke so outline is visible on dark bg */
    :host-context(.dark) .stroke-text {
      -webkit-text-stroke-color: #9ca3af;
    }
    @media (max-width: 640px) {
      :host-context(.dark) .stroke-text {
        -webkit-text-stroke: 2.5px rgba(249, 115, 22, 0.6);
      }
    }
    @media (max-width: 400px) {
      :host-context(.dark) .stroke-text {
        -webkit-text-stroke: 2px rgba(249, 115, 22, 0.6);
      }
    }

    /* Mobile image — compact upper-body crop */
    .mobile-img-wrap {
      position: relative;
      width: 220px;
      height: 260px;
      overflow: hidden;
      clip-path: inset(0 0 20% 0 round 16px);
    }
    .mobile-img {
      width: 100%;
      height: auto;
      object-fit: contain;
      object-position: center top;
      display: block;
      transform: scale(1.15);
      transform-origin: top center;
    }
    @media (min-width: 400px) {
      .mobile-img-wrap { width: 260px; height: 310px; }
    }
  `]
})
export class HeroComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
