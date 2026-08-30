import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../../services/blog.service';
import { SeoService } from '../../../services/seo.service';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AnimateOnScrollDirective],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(80, animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <div class="min-h-screen bg-beige-50 dark:bg-gray-950 transition-colors duration-300">

      <!-- Hero Banner -->
        <div class="bg-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div class="absolute inset-0 opacity-[0.03]"
               style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 64px 64px;"></div>
        </div>
        <div class="container mx-auto px-4 relative z-10 text-center" animateOnScroll="fade-up">
          <span class="text-primary-400 text-sm uppercase tracking-widest font-semibold mb-4 block">Thoughts & Insights</span>
          <h1 class="text-4xl sm:text-5xl md:text-7xl font-black mb-6">The Blog</h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Software engineering, product thinking, and lessons learned from building real products.
          </p>
          <!-- Stats row -->
          <div class="flex items-center justify-center gap-8 mt-10 text-sm text-gray-400">
            <span>{{ posts.length }} Articles</span>
            <span class="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>{{ allTags.length }} Topics</span>
            <span class="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>Engineering + Career</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="container mx-auto px-4 py-12 md:py-20">

        <!-- Loading -->
        <div *ngIf="loading" class="flex justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p class="text-gray-500 text-sm">Loading posts...</p>
          </div>
        </div>

        <ng-container *ngIf="!loading && posts.length > 0">

          <!-- ── Featured Post ── -->
          <div class="mb-16" animateOnScroll="fade-up">
            <div class="relative bg-gray-900 rounded-3xl overflow-hidden cursor-pointer group"
                 [routerLink]="['/blog', posts[0].slug]">
              <!-- Gradient & pattern -->
              <div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
              <div class="absolute inset-0 opacity-5 pointer-events-none">
                <div class="absolute top-8 right-8 w-64 h-64 border-2 border-white rounded-full"></div>
                <div class="absolute top-16 right-16 w-48 h-48 border-2 border-white rounded-full"></div>
                <div class="absolute top-24 right-24 w-32 h-32 border-2 border-white rounded-full"></div>
              </div>
              <!-- Content -->
              <div class="relative z-20 p-6 sm:p-10 md:p-16 max-w-2xl">
                <div class="flex flex-wrap items-center gap-2 mb-6">
                  <span class="px-2.5 py-1 bg-primary-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                  <span *ngFor="let cat of posts[0].categories"
                        class="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {{ cat }}
                  </span>
                </div>
                <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 group-hover:text-primary-400 transition-colors leading-tight">
                  {{ posts[0].title }}
                </h2>
                <p class="text-gray-300 text-lg mb-8 leading-relaxed">{{ posts[0].excerpt }}</p>
                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span>{{ formatDate(posts[0].created_at) }}</span>
                  <span>·</span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ posts[0].read_time }} min read
                  </span>
                  <span class="ml-auto text-primary-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read article
                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Tag Filters ── -->
          <div class="mb-12" animateOnScroll="fade-up" [animDelay]="100">
            <div class="flex flex-wrap gap-2 items-center">
              <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Filter:</span>
              <button
                (click)="selectedTag.set('All')"
                class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                [ngClass]="selectedTag() === 'All'
                  ? 'bg-gray-900 dark:bg-primary-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'">
                All ({{ posts.length }})
              </button>
              <button
                *ngFor="let tag of visibleTags()"
                (click)="selectedTag.set(tag)"
                class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                [ngClass]="selectedTag() === tag
                  ? 'bg-gray-900 dark:bg-primary-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'">
                #{{ tag }}
              </button>
              <button
                *ngIf="allTags.length > tagPreviewCount"
                (click)="showAllTags.set(!showAllTags())"
                class="px-4 py-2 rounded-full text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                {{ showAllTags() ? 'Show fewer' : '+ ' + (allTags.length - tagPreviewCount) + ' more' }}
              </button>
            </div>
          </div>

          <!-- ── Posts Grid ── -->
          <div [@listAnimation]="filteredPosts().length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              *ngFor="let post of filteredPosts(); trackBy: trackBySlug"
              [routerLink]="['/blog', post.slug]"
              class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
                     dark:hover:shadow-gray-900/50 transition-all duration-300 cursor-pointer
                     border border-gray-100 dark:border-gray-700 hover:-translate-y-1 flex flex-col">

              <!-- Top color bar -->
              <div class="h-1 bg-gradient-to-r from-primary-500 to-primary-400"></div>

              <div class="p-5 sm:p-8 flex flex-col flex-1">
                <!-- Category badges -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span *ngFor="let cat of post.categories"
                        class="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded text-xs font-bold uppercase tracking-wider">
                    {{ cat }}
                  </span>
                </div>

                <!-- Title -->
                <h2 class="text-xl font-black text-gray-900 dark:text-white mb-3
                           group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug flex-1">
                  {{ post.title }}
                </h2>

                <!-- Excerpt -->
                <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{{ post.excerpt }}</p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1.5 mb-5">
                  <span *ngFor="let tag of post.tags?.slice(0, 3)"
                        class="text-xs text-gray-400 dark:text-gray-500 hover:text-primary-500 transition-colors cursor-pointer"
                        (click)="$event.stopPropagation(); selectedTag.set(tag)">
                    #{{ tag }}
                  </span>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                  <span>{{ formatDate(post.created_at) }}</span>
                  <span class="flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ post.read_time }} min read
                  </span>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty filtered state -->
          <div *ngIf="filteredPosts().length === 0" class="text-center py-20">
            <div class="text-5xl mb-4">🔍</div>
            <p class="text-gray-500 dark:text-gray-400 mb-3">No posts with tag <strong>#{{ selectedTag() }}</strong></p>
            <button (click)="selectedTag.set('All')"
                    class="text-primary-500 hover:text-primary-400 text-sm font-semibold">
              ← Show all posts
            </button>
          </div>

        </ng-container>

        <!-- Empty state (no posts at all) -->
        <div *ngIf="!loading && posts.length === 0" class="text-center py-20">
          <div class="text-6xl mb-6">📝</div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No posts yet</h2>
          <p class="text-gray-500">Check back soon for new articles.</p>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class BlogListComponent implements OnInit, OnDestroy {
  posts: BlogPost[] = [];
  loading = true;

  selectedTag = signal<string>('All');

  allTags: string[] = [];

  /** How many tags to show before collapsing the long tail. */
  readonly tagPreviewCount = 12;
  showAllTags = signal(false);

  visibleTags = computed(() =>
    this.showAllTags() ? this.allTags : this.allTags.slice(0, this.tagPreviewCount)
  );

  filteredPosts = computed(() => {
    const tag = this.selectedTag();
    if (tag === 'All') return this.posts;
    return this.posts.filter(p => p.tags?.includes(tag));
  });

  constructor(
    private blogService: BlogService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.applyPage({
      title: 'Blog — Software Engineering, Angular, iOS & AI',
      description:
        'Articles on software engineering, Angular, SwiftUI, AI coding agents and lessons learned from building real products in FinTech.',
      path: '/blog',
      keywords: 'software engineering blog, angular, swiftui, ai agents, fintech, Mihajlo Petrovic'
    });
    this.loadPosts();
  }

  ngOnDestroy() {
    this.seo.removeJsonLd('blog');
  }

  loadPosts() {
    this.loading = true;
    this.blogService.getPosts(true).subscribe({
      next: (posts) => {
        this.posts = posts;
        // Rank tags by how many posts use them, so the preview shows the useful ones
        const counts = new Map<string, number>();
        posts.forEach(p => p.tags?.forEach(t => counts.set(t, (counts.get(t) ?? 0) + 1)));
        this.allTags = Array.from(counts.entries())
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
          .map(([tag]) => tag);
        this.setBlogJsonLd(posts);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  /** Lets search engines see the article list even before they render the cards. */
  private setBlogJsonLd(posts: BlogPost[]) {
    this.seo.setJsonLd('blog', {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': this.seo.absoluteUrl('/blog'),
      name: 'Mihajlo Petrovic — Blog',
      description:
        'Software engineering, product thinking, and lessons learned from building real products.',
      inLanguage: 'en',
      author: { '@id': `${this.seo.siteUrl}/#person` },
      blogPost: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt || post.title,
        url: this.seo.absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.created_at,
        dateModified: post.updated_at,
        keywords: (post.tags || []).join(', '),
        author: { '@id': `${this.seo.siteUrl}/#person` }
      }))
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  trackBySlug(_: number, post: BlogPost): string {
    return post.slug;
  }
}
