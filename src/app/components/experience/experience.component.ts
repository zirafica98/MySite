import { Component, OnInit, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  logo: string; // emoji fallback
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section id="experience" class="py-24 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">

      <!-- Background elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full -translate-x-1/3 translate-y-1/3"></div>
        <!-- Grid lines -->
        <div class="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
             style="background-image: linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px); background-size: 64px 64px;"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">

        <!-- Header -->
        <div class="text-center mb-20" animateOnScroll="fade-up">
          <span class="text-primary-500 dark:text-primary-400 text-sm uppercase tracking-widest font-semibold">Career</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mt-3">
            Work Experience
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            5+ years building real products in FinTech, e-commerce, and beyond.
          </p>
        </div>

        <!-- Timeline -->
        <div class="max-w-4xl mx-auto">
          <div class="relative">

            <!-- Vertical line -->
            <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-500/50 to-transparent md:-translate-x-1/2"></div>

            <div *ngFor="let exp of experiences; let i = index; let last = last"
                 class="relative mb-12"
                 [class.opacity-100]="visibleItems.has(exp.id)"
                 [class.opacity-0]="!visibleItems.has(exp.id)"
                 [class.translate-y-0]="visibleItems.has(exp.id)"
                 [class.translate-y-8]="!visibleItems.has(exp.id)"
                 style="transition: opacity 0.5s ease, transform 0.5s ease;"
                 [attr.data-id]="exp.id"
                 #timelineItem>

              <!-- Timeline dot -->
              <div class="absolute left-6 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 z-10">
                <div class="w-5 h-5 rounded-full border-2 transition-colors duration-300"
                     [class]="exp.current
                       ? 'bg-primary-500 border-primary-400 shadow-lg shadow-primary-500/50'
                       : 'bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-600'">
                  <div *ngIf="exp.current" class="absolute inset-0 rounded-full bg-primary-500/30 animate-ping"></div>
                </div>
              </div>

              <!-- Card — alternating sides on desktop -->
              <div class="ml-16 md:ml-0 md:w-5/12"
                   [class]="i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'">
                <div class="bg-white dark:bg-gray-900 border rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300 group shadow-sm dark:shadow-none"
                     [class]="exp.current ? 'border-primary-500/30' : 'border-gray-200 dark:border-gray-800'">

                  <!-- Card header -->
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                      {{ exp.logo }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 flex-wrap">
                        <h3 class="text-lg font-black text-gray-900 dark:text-white leading-tight">{{ exp.role }}</h3>
                        <span *ngIf="exp.current"
                              class="px-2 py-0.5 bg-primary-500/20 text-primary-400 text-xs font-bold rounded-full border border-primary-500/30">
                          Current
                        </span>
                      </div>
                      <p class="text-primary-500 dark:text-primary-400 font-semibold text-sm mt-0.5">{{ exp.company }}</p>
                      <div class="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-500">
                        <span class="flex items-center gap-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          {{ exp.period }}
                        </span>
                        <span>·</span>
                        <span class="flex items-center gap-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {{ exp.location }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{{ exp.description }}</p>

                  <!-- Achievements -->
                  <ul class="space-y-1.5 mb-5">
                    <li *ngFor="let ach of exp.achievements"
                        class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <svg class="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      {{ ach }}
                    </li>
                  </ul>

                  <!-- Tech tags -->
                  <div class="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span *ngFor="let tech of exp.technologies"
                          class="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  visibleItems = new Set<number>();
  private observer?: IntersectionObserver;

  experiences: Experience[] = [
    {
      id: 1,
      company: 'Raiffeisen Bank',
      role: 'Software Engineer',
      period: 'Jul 2022 — Present',
      location: 'Belgrade, Serbia',
      current: true,
      description: 'Working in an international team on digital banking products used by thousands of customers monthly. Responsible for full-stack development of onboarding and account-opening flows across multiple countries.',
      achievements: [
        'Built digital onboarding for 2,000–3,000 users/month across 3 countries',
        'Integrated Camunda 7 BPM engine for complex multi-step process automation',
        'Developed dynamic form engine with conditional logic and real-time validation',
        'Collaborated with international teams across Austria, Serbia, and Croatia'
      ],
      technologies: ['Angular', 'TypeScript', 'C#', 'Camunda 7', 'FormsEngine', 'SQL Server', 'REST APIs'],
      logo: '🏦'
    },
    {
      id: 2,
      company: 'Freelance & Personal Projects',
      role: 'Full Stack Developer',
      period: '2020 — Present',
      location: 'Remote',
      current: false,
      description: 'Building web and mobile applications for various clients and personal projects. Focus on modern stacks — Angular, Node.js, React, and iOS with SwiftUI.',
      achievements: [
        'Developed NeatCommit, an AI-powered GitHub App for code review',
        'Built TripPlanner and MoneyBudget iOS apps with SwiftUI + Firebase',
        'Created Velo Invoice with AI-assisted invoice generation via OpenAI API',
        'Delivered e-commerce solutions using Magento and custom PHP/Laravel'
      ],
      technologies: ['Angular', 'React', 'Node.js', 'SwiftUI', 'Firebase', 'OpenAI API', 'Magento', 'PHP'],
      logo: '💻'
    },
    {
      id: 3,
      company: 'Web Agency',
      role: 'Frontend Developer',
      period: '2019 — 2022',
      location: 'Belgrade, Serbia',
      current: false,
      description: 'Worked on a variety of client projects from e-commerce platforms to corporate websites. Gained broad experience across different stacks and industries.',
      achievements: [
        'Delivered 10+ client websites and web applications',
        'Implemented responsive designs with HTML, CSS, and JavaScript',
        'Built CMS-driven websites using WordPress and custom solutions',
        'Introduced Angular to the team for SPA projects'
      ],
      technologies: ['Angular', 'jQuery', 'HTML/CSS', 'SASS', 'WordPress', 'PHP', 'MySQL'],
      logo: '🌐'
    }
  ];

  ngOnInit() {
    setTimeout(() => this.initObserver(), 200);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            this.visibleItems = new Set([...this.visibleItems, id]);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    this.timelineItems.forEach(item => {
      this.observer!.observe(item.nativeElement);
    });
  }
}
