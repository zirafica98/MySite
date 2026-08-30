import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../../services/blog.service';
import { SeoService } from '../../../services/seo.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-20">
      <div class="container mx-auto px-4 max-w-4xl" @fadeIn>

        <div class="mb-10">
          <h1 class="text-4xl font-black text-gray-900">Blog Management</h1>
          <p class="text-gray-500 mt-2">Posts are managed via <code class="bg-gray-200 px-2 py-0.5 rounded text-sm">src/assets/blogs.json</code></p>
        </div>

        <!-- Info Banner -->
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10 flex gap-4">
          <svg class="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <p class="font-semibold text-blue-800 mb-1">How to add or edit blog posts</p>
            <p class="text-blue-700 text-sm leading-relaxed">
              Open <strong>src/assets/blogs.json</strong> and add or modify entries.
              Each post needs: <code class="bg-blue-100 px-1 rounded">id</code>,
              <code class="bg-blue-100 px-1 rounded">title</code>,
              <code class="bg-blue-100 px-1 rounded">slug</code>,
              <code class="bg-blue-100 px-1 rounded">content</code> (Markdown),
              <code class="bg-blue-100 px-1 rounded">excerpt</code>,
              <code class="bg-blue-100 px-1 rounded">published</code>,
              <code class="bg-blue-100 px-1 rounded">created_at</code>.
            </p>
          </div>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="flex justify-center py-12">
          <div class="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <!-- Posts List -->
        <div *ngIf="!loading" class="space-y-4">
          <div *ngFor="let post of posts()"
               class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <span [class]="post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                      class="text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {{ post.published ? 'Published' : 'Draft' }}
                </span>
                <span class="text-xs text-gray-400">{{ formatDate(post.created_at) }}</span>
                <span class="text-xs text-gray-400">· {{ post.read_time }} min read</span>
              </div>
              <h3 class="font-bold text-gray-900 truncate">{{ post.title }}</h3>
              <p class="text-gray-500 text-sm truncate mt-0.5">{{ post.excerpt }}</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <a [routerLink]="['/blog', post.slug]" target="_blank"
                 class="px-4 py-2 text-sm font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                View →
              </a>
            </div>
          </div>

          <div *ngIf="posts().length === 0" class="text-center py-12 text-gray-400">
            No posts found in blogs.json
          </div>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  posts = signal<BlogPost[]>([]);
  loading = false;

  constructor(
    private blogService: BlogService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.applyPage({
      title: 'Admin',
      description: 'Internal content dashboard.',
      path: '/admin',
      noIndex: true
    });
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.blogService.getPosts(false).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
