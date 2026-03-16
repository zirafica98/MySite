import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories?: string[];
  tags?: string[];
  read_time?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private jsonUrl = 'assets/blogs.json';

  constructor(private http: HttpClient) {}

  getPosts(publishedOnly: boolean = true): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.jsonUrl).pipe(
      map(posts => {
        const filtered = publishedOnly ? posts.filter(p => p.published) : posts;
        return filtered
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .map(p => ({ ...p, read_time: this.estimateReadTime(p.content) }));
      }),
      catchError(err => {
        console.error('Error loading blog posts:', err);
        return of([]);
      })
    );
  }

  getPostBySlug(slug: string): Observable<BlogPost | null> {
    return this.http.get<BlogPost[]>(this.jsonUrl).pipe(
      map(posts => {
        const post = posts.find(p => p.slug === slug && p.published) ?? null;
        return post ? { ...post, read_time: this.estimateReadTime(post.content) } : null;
      }),
      catchError(() => of(null))
    );
  }

  private estimateReadTime(content: string): number {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }
}
