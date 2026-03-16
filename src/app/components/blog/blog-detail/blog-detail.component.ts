import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../../services/blog.service';
import { SeoService } from '../../../services/seo.service';
import { marked } from 'marked';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="min-h-screen bg-beige-50 dark:bg-gray-950 transition-colors duration-300">

      <!-- Loading -->
      <div *ngIf="loading" class="flex justify-center items-center min-h-screen">
        <div class="flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-500 text-sm">Loading article...</p>
        </div>
      </div>

      <!-- Article -->
      <div *ngIf="!loading && post" @fadeIn>

        <!-- Header -->
        <div class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-20 pb-16 relative overflow-hidden transition-colors duration-300">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div class="container mx-auto px-4 max-w-4xl relative z-10">
            <!-- Back link -->
            <a routerLink="/blog" class="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-10 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Blog
            </a>

            <!-- Categories -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span *ngFor="let cat of post.categories"
                    class="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                {{ cat }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              {{ post.title }}
            </h1>

            <!-- Meta -->
              <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xs">MP</div>
                <span class="text-gray-900 dark:text-white font-medium">Mihajlo Petrovic</span>
              </div>
              <span>·</span>
              <span>{{ formatDate(post.created_at) }}</span>
              <span>·</span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ post.read_time }} min read
              </span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="container mx-auto px-4 max-w-3xl py-16">
          <!-- Excerpt -->
          <p class="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-12 font-light border-l-4 border-primary-500 pl-6 italic">
            {{ post.excerpt }}
          </p>

          <!-- Article body -->
          <div class="prose-article dark-prose" [innerHTML]="renderedContent"></div>

          <!-- Tags -->
          <div *ngIf="post.tags && post.tags.length > 0" class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let tag of post.tags"
                    class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default">
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Author card -->
          <div class="mt-12 p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl transition-colors duration-300">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0">MP</div>
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Written by</div>
                <h3 class="text-xl font-bold mb-2">Mihajlo Petrovic</h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Software Engineer based in Belgrade, Serbia. Building web & mobile solutions at Raiffeisen Bank.
                  Passionate about Angular, iOS development, and AI-powered products.
                </p>
                <div class="flex gap-4 mt-4">
                  <a href="https://linkedin.com/in/mihajlo-petrovic-355810197/" target="_blank"
                     class="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                    LinkedIn →
                  </a>
                  <a href="mailto:mihajlop98@gmail.com"
                     class="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                    Email →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Back button -->
          <div class="mt-12 text-center">
            <a routerLink="/blog"
               class="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-500 dark:hover:bg-primary-500 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to all articles
            </a>
          </div>
        </div>
      </div>

      <!-- Not found -->
      <div *ngIf="!loading && !post" class="flex flex-col items-center justify-center min-h-screen gap-4">
        <div class="text-6xl">🔍</div>
        <h2 class="text-2xl font-bold text-gray-900">Article not found</h2>
        <p class="text-gray-500">The article you're looking for doesn't exist or has been removed.</p>
        <a routerLink="/blog" class="mt-4 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
          Back to Blog
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .prose-article {
      color: #374151;
      line-height: 1.8;
      font-size: 1.125rem;
    }
    /* Dark mode prose */
    :host-context(.dark) ::ng-deep .prose-article { color: #d1d5db; }
    :host-context(.dark) ::ng-deep .prose-article strong { color: #f9fafb; }
    :host-context(.dark) ::ng-deep .prose-article em { color: #9ca3af; }
    :host-context(.dark) ::ng-deep .prose-article code { background: #1f2937; color: #f9fafb; }
    :host-context(.dark) ::ng-deep .prose-article blockquote { background: #1f2937; color: #fbbf24; border-left-color: #f97316; }
    :host-context(.dark) ::ng-deep .prose-article hr { border-color: #374151; }
    :host ::ng-deep .prose-article h1,
    :host ::ng-deep .prose-article h2,
    :host ::ng-deep .prose-article h3,
    :host ::ng-deep .prose-article h4 {
      color: #111827;
    }
    :host-context(.dark) ::ng-deep .prose-article h1,
    :host-context(.dark) ::ng-deep .prose-article h2,
    :host-context(.dark) ::ng-deep .prose-article h3,
    :host-context(.dark) ::ng-deep .prose-article h4 {
      color: #f9fafb;
      font-weight: 800;
      line-height: 1.3;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
    }
    :host ::ng-deep .prose-article h1 { font-size: 2.25rem; }
    :host ::ng-deep .prose-article h2 { font-size: 1.75rem; }
    :host ::ng-deep .prose-article h3 { font-size: 1.4rem; }
    :host ::ng-deep .prose-article p { margin-bottom: 1.5rem; }
    :host ::ng-deep .prose-article ul,
    :host ::ng-deep .prose-article ol {
      margin: 1.5rem 0;
      padding-left: 2rem;
    }
    :host ::ng-deep .prose-article ul { list-style-type: disc; }
    :host ::ng-deep .prose-article ol { list-style-type: decimal; }
    :host ::ng-deep .prose-article li { margin-bottom: 0.5rem; }
    :host ::ng-deep .prose-article strong { color: #111827; font-weight: 700; }
    :host ::ng-deep .prose-article em { color: #6b7280; font-style: italic; }
    :host ::ng-deep .prose-article a {
      color: #f97316;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    :host ::ng-deep .prose-article a:hover { color: #ea580c; }
    :host ::ng-deep .prose-article code {
      background: #f3f4f6;
      color: #111827;
      padding: 0.2rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-family: 'Fira Code', monospace;
    }
    :host ::ng-deep .prose-article pre {
      background: #111827;
      color: #f9fafb;
      padding: 1.5rem;
      border-radius: 0.75rem;
      overflow-x: auto;
      margin: 2rem 0;
      border-left: 4px solid #f97316;
    }
    :host ::ng-deep .prose-article pre code {
      background: none;
      color: inherit;
      padding: 0;
      font-size: 0.9rem;
    }
    :host ::ng-deep .prose-article blockquote {
      border-left: 4px solid #f97316;
      padding: 1rem 1.5rem;
      background: #fff7ed;
      border-radius: 0 0.5rem 0.5rem 0;
      margin: 2rem 0;
      font-style: italic;
      color: #92400e;
    }
    :host ::ng-deep .prose-article hr {
      border: none;
      border-top: 2px solid #f3f4f6;
      margin: 3rem 0;
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | null = null;
  renderedContent = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadPost(slug);
    }
  }

  loadPost(slug: string) {
    this.loading = true;
    this.blogService.getPostBySlug(slug).subscribe({
      next: async (post) => {
        this.post = post;
        if (post) {
          try {
            const parsed = await marked.parse(post.content);
            this.renderedContent = typeof parsed === 'string' ? parsed : String(parsed);
          } catch (err) {
            console.error('Error parsing markdown:', err);
            this.renderedContent = post.content;
          }
          this.seo.setPageTitle(post.title);
          this.seo.setMetaDescription(post.excerpt || post.title);
          this.seo.setOpenGraphTags({
            title: post.title,
            description: post.excerpt || post.title,
            image: post.cover_image,
            type: 'article'
          });
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
