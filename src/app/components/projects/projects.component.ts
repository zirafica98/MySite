import { Component, OnInit, OnDestroy, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  screenshots?: string[];
  screenshotDevice?: 'ios' | 'android' | 'web';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  year: number;
  highlight?: boolean;
  features?: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  animations: [
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(80, animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ]),
    trigger('modalAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalPanelAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }))
      ])
    ])
  ],
  template: `
    <section id="projects" class="py-24 bg-beige-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">

      <!-- Background accent -->
      <div class="absolute top-0 left-0 w-72 h-72 bg-primary-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/3 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div class="container mx-auto px-4">

        <!-- Header -->
        <div class="text-center mb-16" animateOnScroll="fade-up">
          <span class="text-primary-500 text-sm uppercase tracking-widest font-semibold">Portfolio</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mt-3">
            Selected Works
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            A collection of projects I've built — from enterprise banking platforms to AI-powered tools.
          </p>
        </div>

        <!-- Filter tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-14">
          <button
            *ngFor="let cat of categories"
            (click)="selectedCategory.set(cat)"
            class="px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
            [ngClass]="selectedCategory() === cat
              ? 'bg-gray-900 dark:bg-primary-500 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'">
            {{ cat }}
            <span *ngIf="cat !== 'All'"
                  class="ml-1.5 text-xs opacity-60">
              ({{ countByCategory(cat) }})
            </span>
          </button>
        </div>

        <!-- Projects Grid -->
        <div [@listAnim]="filteredProjects().length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let project of filteredProjects(); trackBy: trackById"
            (click)="openModal(project)"
            class="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl
                   dark:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-700
                   hover:-translate-y-2 flex flex-col cursor-pointer">

            <!-- Top accent bar -->
            <div class="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-500"></div>

            <!-- Card header -->
            <div class="relative h-44 overflow-hidden"
                 [class]="project.highlight
                   ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-primary-900'
                   : 'bg-gradient-to-br from-gray-900 to-gray-800'">
              <img *ngIf="project.image" [src]="project.image" [alt]="project.title"
                   class="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500">
              <!-- Tech watermark letter -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="font-black text-8xl select-none pointer-events-none transition-all duration-300 group-hover:scale-110"
                      [class]="project.highlight ? 'text-primary-500/25' : 'text-white/10'">
                  {{ project.technologies[0].charAt(0) }}
                </span>
              </div>
              <!-- Year -->
              <div class="absolute top-4 right-4 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {{ project.year }}
              </div>
              <!-- Category -->
              <div class="absolute top-4 left-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ project.category }}
              </div>
              <!-- Featured badge -->
              <div *ngIf="project.highlight"
                   class="absolute bottom-4 left-4 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-black px-2.5 py-1 rounded-full">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Featured
              </div>
              <!-- View details overlay on hover -->
              <div class="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-all duration-300 flex items-center justify-center">
                <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white
                             text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                  View Details →
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-1">
              <h3 class="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                {{ project.title }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                {{ project.description }}
              </p>

              <!-- First 4 techs only -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span *ngFor="let tech of project.technologies.slice(0, 4)"
                      class="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                  {{ tech }}
                </span>
                <span *ngIf="project.technologies.length > 4"
                      class="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-md text-xs font-medium">
                  +{{ project.technologies.length - 4 }} more
                </span>
              </div>

              <!-- Links row -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div class="flex gap-3">
                  <a *ngIf="project.githubUrl"
                     [href]="project.githubUrl"
                     target="_blank" rel="noopener noreferrer"
                     (click)="$event.stopPropagation()"
                     class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-semibold transition-colors">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a *ngIf="project.liveUrl"
                     [href]="project.liveUrl"
                     target="_blank" rel="noopener noreferrer"
                     (click)="$event.stopPropagation()"
                     class="flex items-center gap-1.5 text-primary-500 hover:text-primary-600 text-xs font-semibold transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Live Demo
                  </a>
                </div>
                <span class="text-xs text-gray-400 dark:text-gray-500">Click for details</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div *ngIf="filteredProjects().length === 0" class="text-center py-16">
          <div class="text-5xl mb-4">🔍</div>
          <p class="text-gray-500 dark:text-gray-400">No projects in this category.</p>
        </div>

      </div>
    </section>

    <!-- ===== PROJECT DETAIL MODAL ===== -->
    <div *ngIf="activeProject()"
         @modalAnim
         class="fixed inset-0 z-[100] flex items-center justify-center p-4"
         (click)="closeModal()">

      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <!-- Panel -->
      <div *ngIf="activeProject()"
           @modalPanelAnim
           (click)="$event.stopPropagation()"
           class="relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

        <!-- Modal header image/gradient -->
        <div class="relative h-48 rounded-t-3xl overflow-hidden flex-shrink-0"
             [class]="activeProject()!.highlight
               ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-primary-900'
               : 'bg-gradient-to-br from-gray-900 to-gray-800'">
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-black text-9xl select-none pointer-events-none"
                  [class]="activeProject()!.highlight ? 'text-primary-500/20' : 'text-white/10'">
              {{ activeProject()!.technologies[0].charAt(0) }}
            </span>
          </div>
          <!-- Badges -->
          <div class="absolute top-4 left-4 flex gap-2">
            <span class="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {{ activeProject()!.category }}
            </span>
            <span *ngIf="activeProject()!.highlight"
                  class="flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-black px-2.5 py-1 rounded-full">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Featured
            </span>
          </div>
          <span class="absolute top-4 right-14 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {{ activeProject()!.year }}
          </span>
          <!-- Close button -->
          <button (click)="closeModal()"
                  class="absolute top-3 right-3 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-5 sm:p-8">
          <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
            {{ activeProject()!.title }}
          </h2>

          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {{ activeProject()!.description }}
          </p>

          <!-- Screenshots gallery -->
          <div *ngIf="activeProject()!.screenshots?.length" class="mb-8">
            <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Screenshots
            </h3>
            <div class="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory scroll-smooth"
                 style="scrollbar-width: thin; scrollbar-color: #f97316 transparent;">
              <div *ngFor="let shot of activeProject()!.screenshots; let i = index"
                   (click)="openLightbox(i)"
                   class="flex-shrink-0 snap-start cursor-zoom-in group relative"
                   style="width: 120px;">
                <!-- iOS-style frame -->
                <div class="relative rounded-[18px] overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700
                            ring-2 ring-transparent group-hover:ring-primary-400 transition-all duration-200"
                     style="aspect-ratio: 9/19.5;">
                  <img [src]="shot" [alt]="'Screenshot ' + (i + 1)"
                       class="w-full h-full object-cover"
                       (error)="onScreenshotError($event)">
                  <!-- Hover overlay -->
                  <div class="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 transition-all duration-200 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                  </div>
                </div>
                <p class="text-center text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">{{ i + 1 }}</p>
              </div>
            </div>
          </div>

          <!-- Tech stack -->
          <div class="mb-6">
            <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              Tech Stack
            </h3>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let tech of activeProject()!.technologies"
                    class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                           rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex flex-wrap gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
            <a *ngIf="activeProject()!.githubUrl"
               [href]="activeProject()!.githubUrl"
               target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900
                      px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-700 dark:hover:bg-gray-100
                      transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <a *ngIf="activeProject()!.liveUrl"
               [href]="activeProject()!.liveUrl"
               target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-bold text-sm
                      hover:bg-primary-600 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Live Demo
            </a>
            <button (click)="closeModal()"
                    class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                           px-6 py-3 rounded-xl font-bold text-sm border border-gray-200 dark:border-gray-700
                           hover:border-gray-400 dark:hover:border-gray-500 transition-colors ml-auto">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== LIGHTBOX ===== -->
    <div *ngIf="lightboxIndex() !== null"
         class="fixed inset-0 z-[200] flex items-center justify-center"
         (click)="closeLightbox()">

      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/95 backdrop-blur-md"></div>

      <!-- Image -->
      <div class="relative z-10 flex items-center gap-4 px-4 max-w-sm w-full"
           (click)="$event.stopPropagation()">

        <!-- Prev -->
        <button (click)="prevLightbox()"
                *ngIf="(activeProject()?.screenshots?.length ?? 0) > 1"
                class="flex-shrink-0 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Phone frame -->
        <div class="flex-1 relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10"
             style="aspect-ratio: 9/19.5; max-height: 80vh;">
          <img [src]="activeProject()!.screenshots![lightboxIndex()!]"
               [alt]="'Screenshot ' + (lightboxIndex()! + 1)"
               class="w-full h-full object-cover">
          <!-- Screen count pill -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {{ lightboxIndex()! + 1 }} / {{ activeProject()!.screenshots!.length }}
          </div>
        </div>

        <!-- Next -->
        <button (click)="nextLightbox()"
                *ngIf="(activeProject()?.screenshots?.length ?? 0) > 1"
                class="flex-shrink-0 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Close button -->
      <button (click)="closeLightbox()"
              class="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    /* Custom thin scrollbar for screenshots row */
    .overflow-x-auto::-webkit-scrollbar { height: 4px; }
    .overflow-x-auto::-webkit-scrollbar-track { background: transparent; }
    .overflow-x-auto::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
  `]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  selectedCategory = signal<string>('All');
  activeProject = signal<Project | null>(null);
  lightboxIndex = signal<number | null>(null);

  categories = ['All', 'Web', 'Mobile', 'Full Stack', 'AI'];

  projects: Project[] = [
    {
      id: 1,
      title: 'NeatCommit — AI Code Review Platform',
      description: 'AI-powered code review and security auditing platform integrated as a GitHub App. Analyzes pull requests using OWASP/CWE rules + GPT-4, delivers inline comments, security scores, and reports. Supports JS, TS, Java, Python, PHP, C#, Go, Ruby and more.',
      image: 'assets/neatcommit.png',
      technologies: ['Angular 17', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'BullMQ', 'OpenAI API', 'GitHub App API', 'Prisma', 'Docker', 'TypeScript'],
      category: 'AI',
      year: 2025,
      highlight: true,
      githubUrl: 'https://github.com/zirafica98/neatcommit',
      liveUrl: 'https://neatcommitv2.vercel.app'
    },
    {
      id: 6,
      title: 'Velo Invoice — AI-Powered Invoice Management',
      description: 'Full-featured invoice management web app with AI-powered invoice generation via OpenAI, client & price list management, recurring invoices, automated email reminders, PDF export, Excel reports (Aging, Sales, Tax), multi-company support, and 5-language i18n. Built with Angular 20 and Firebase.',
      image: 'assets/velo.png',
      technologies: ['Angular 20', 'Angular Material', 'Firebase', 'Firestore', 'Firebase Auth', 'OpenAI API', 'RxJS', 'TypeScript', 'jsPDF', 'xlsx'],
      category: 'Full Stack',
      year: 2025,
      highlight: true,
      githubUrl: 'https://github.com/zirafica98/invoice-app',
      liveUrl: 'https://invoice-app-three-bay.vercel.app/'
    },
    {
      id: 5,
      title: 'Digital Onboarding — Raiffeisen Bank',
      description: 'End-to-end digital onboarding and deposit account opening flow, serving 2,000–3,000 users per month across multiple countries. Built with Angular, C# and Camunda 7 BPM engine for process orchestration.',
      image: 'assets/rajf.png',
      technologies: ['Angular', 'C#', 'Camunda 7', 'TypeScript', 'FormsEngine', 'REST API'],
      category: 'Web',
      year: 2023,
      highlight: true,
      liveUrl: 'https://rol.raiffeisenbank.rs/biznisiracun/DigitalAccountCorporate/NewTransactionAccount'
    },
    {
      id: 3,
      title: 'TripPlanner — iOS Travel App',
      description: 'Modern iOS travel planning app with elegant UI, real-time location search, Apple Maps integration, Firebase backend, and multi-language support (EN, FR, ES, DE). Features Google & Apple Sign-In, parallax hero animations, trip itineraries, and calendar integration.',
      technologies: ['SwiftUI', 'Firebase', 'Firestore', 'MapKit', 'CoreLocation', 'Combine', 'Async/Await', 'Google Sign-In', 'Apple Sign-In'],
      category: 'Mobile',
      year: 2024,
      githubUrl: 'https://github.com/zirafica98/TripPlanner',
      screenshots: [
        'assets/iosApp/TripPlanner/1.png',
        'assets/iosApp/TripPlanner/2.png',
        'assets/iosApp/TripPlanner/3.png',
        'assets/iosApp/TripPlanner/4.png'
      ],
      screenshotDevice: 'ios'
    },
    {
      id: 4,
      title: 'MoneyBudget — Personal Finance iOS App',
      description: 'iOS personal budget management app built with SwiftUI and Firebase Firestore. Features a dashboard with pie charts, expense categories with limits, income & savings tracking, credit card installment tracking, shopping list, fixed expenses, and full budget history per month. Bilingual (Serbian/English).',
      technologies: ['SwiftUI', 'Firebase Firestore', 'Firebase SDK', 'MVVM', 'Swift Package Manager', 'Charts'],
      category: 'Mobile',
      year: 2024,
      screenshots: [
        'assets/iosApp/MoneyBudget/1.png',
        'assets/iosApp/MoneyBudget/2.png',
        'assets/iosApp/MoneyBudget/3.png',
        'assets/iosApp/MoneyBudget/4.png'
      ],
      screenshotDevice: 'ios'
    },
    {
      id: 7,
      title: 'Mapping History — Interactive Historical Map',
      description: 'Interactive web app for visualizing historical events on a map. Search any city to discover nearby historical markers within 5 km, or follow animated "Story" routes that guide you through key events on a timeline. Features animated story mode with moving markers, historical GeoJSON border overlays matching event years, Wikipedia links, YouTube videos, and Google Maps directions.',
      longDescription: 'Built with Angular 18 and Leaflet maps. Uses OpenStreetMap Nominatim for geocoding, Firebase Realtime Database for historical data, and dynamically loads GeoJSON overlays with historical country borders. The story mode animates a marker along a route while drawing the path and revealing info panels at each stop.',
      technologies: ['Angular 18', 'Leaflet', 'Firebase Realtime DB', 'AngularFire', 'RxJS', 'TypeScript', 'OpenStreetMap Nominatim', 'MapTiler', 'GeoJSON'],
      category: 'Web',
      year: 2024,
      githubUrl: 'https://github.com/zirafica98/Markers-Nearby-Angular',
      liveUrl: 'https://nearby-marker.mappinghistory.com/location/New%20York',
      features: [
        'Search any city — shows nearest 10 historical markers within 5 km radius',
        'Animated Story Mode with moving marker and polyline path drawing',
        'Historical GeoJSON border overlays matching the year of each event',
        'Info panels with Wikipedia links, YouTube videos, and Google Maps directions',
        'Haversine formula for accurate geo-distance filtering'
      ]
    }
  ];

  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === cat);
  });

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  openModal(project: Project) {
    this.activeProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.lightboxIndex.set(null);
    this.activeProject.set(null);
    document.body.style.overflow = '';
  }

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
  }

  closeLightbox() {
    this.lightboxIndex.set(null);
  }

  prevLightbox() {
    const shots = this.activeProject()?.screenshots;
    if (!shots) return;
    const current = this.lightboxIndex() ?? 0;
    this.lightboxIndex.set((current - 1 + shots.length) % shots.length);
  }

  nextLightbox() {
    const shots = this.activeProject()?.screenshots;
    if (!shots) return;
    const current = this.lightboxIndex() ?? 0;
    this.lightboxIndex.set((current + 1) % shots.length);
  }

  onScreenshotError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.lightboxIndex() !== null) {
      this.closeLightbox();
    } else {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft() {
    if (this.lightboxIndex() !== null) this.prevLightbox();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight() {
    if (this.lightboxIndex() !== null) this.nextLightbox();
  }

  countByCategory(cat: string): number {
    return this.projects.filter(p => p.category === cat).length;
  }

  trackById(index: number, project: Project): number {
    return project.id;
  }
}
