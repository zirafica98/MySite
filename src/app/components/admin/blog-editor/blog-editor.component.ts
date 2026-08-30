import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-20">
      <div class="container mx-auto px-4 max-w-3xl">

        <a routerLink="/admin" class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-10 text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Dashboard
        </a>

        <h1 class="text-4xl font-black text-gray-900 mb-4">Add a Blog Post</h1>
        <p class="text-gray-500 mb-10">Blog posts are managed directly in the JSON file.</p>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 class="text-lg font-bold text-gray-900 mb-4">How to add a new post</h2>
          <ol class="space-y-4 text-gray-600 text-sm leading-relaxed list-decimal list-inside">
            <li>Open <code class="bg-gray-100 px-2 py-0.5 rounded font-mono">src/assets/blogs.json</code></li>
            <li>Copy an existing post entry and paste it at the top of the array</li>
            <li>Update all fields: <code class="bg-gray-100 px-1 rounded font-mono">id</code>, <code class="bg-gray-100 px-1 rounded font-mono">title</code>, <code class="bg-gray-100 px-1 rounded font-mono">slug</code>, <code class="bg-gray-100 px-1 rounded font-mono">content</code>, etc.</li>
            <li>Set <code class="bg-gray-100 px-1 rounded font-mono">"published": true</code> when ready to go live</li>
            <li>Save the file — the blog list updates automatically</li>
            <li>Run <code class="bg-gray-100 px-2 py-0.5 rounded font-mono">npm run seo</code> to refresh <code class="bg-gray-100 px-1 rounded font-mono">sitemap.xml</code> and <code class="bg-gray-100 px-1 rounded font-mono">feed.xml</code> (also runs automatically on <code class="bg-gray-100 px-1 rounded font-mono">npm run build</code>)</li>
          </ol>

          <div class="mt-8 bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre class="text-green-400 text-xs font-mono leading-relaxed">{{ examplePost }}</pre>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class BlogEditorComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.applyPage({
      title: 'New post',
      description: 'Internal content editor.',
      path: '/admin/new',
      noIndex: true
    });
  }

  examplePost = `{
  "id": "6",
  "title": "Your Post Title",
  "slug": "your-post-slug",
  "excerpt": "A short summary of the post.",
  "cover_image": "",
  "published": true,
  "created_at": "2026-03-15T10:00:00.000Z",
  "updated_at": "2026-03-15T10:00:00.000Z",
  "categories": ["Engineering"],
  "tags": ["angular", "web"],
  "content": "# Your Post Title\\n\\nWrite in **Markdown** here."
}`;
}
