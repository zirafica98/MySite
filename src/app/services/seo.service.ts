import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  setPageTitle(title: string) {
    this.title.setTitle(`${title} | Portfolio`);
  }

  setMetaDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setMetaKeywords(keywords: string) {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  setOpenGraphTags(data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  }) {
    if (data.title) {
      this.meta.updateTag({ property: 'og:title', content: data.title });
    }
    if (data.description) {
      this.meta.updateTag({ property: 'og:description', content: data.description });
    }
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }
    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: data.url });
    }
    if (data.type) {
      this.meta.updateTag({ property: 'og:type', content: data.type });
    }
  }

  setTwitterCard(data: {
    title?: string;
    description?: string;
    image?: string;
  }) {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    if (data.title) {
      this.meta.updateTag({ name: 'twitter:title', content: data.title });
    }
    if (data.description) {
      this.meta.updateTag({ name: 'twitter:description', content: data.description });
    }
    if (data.image) {
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    }
  }
}
