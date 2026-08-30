import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface ArticleSeo {
  publishedTime: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export interface PageSeo {
  /** Page title without the site suffix. */
  title: string;
  description: string;
  /** Route path, e.g. '/blog/my-post'. Used for canonical + og:url. */
  path: string;
  keywords?: string;
  /** Absolute or app-relative image path. Relative paths are made absolute. */
  image?: string;
  type?: 'website' | 'article';
  article?: ArticleSeo;
  /** Set true for pages that should stay out of search results. */
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  /** Canonical origin of the site — keep in sync with sitemap.xml and robots.txt. */
  readonly siteUrl = 'https://mihajlopetrovic.me';
  readonly siteName = 'Mihajlo Petrovic';
  readonly defaultImage = 'assets/logov2-removebg-preview.png';

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  /** One call that sets every tag a page needs. Prefer this over the granular setters. */
  applyPage(seo: PageSeo) {
    const url = this.absoluteUrl(seo.path);
    const image = this.absoluteUrl(seo.image || this.defaultImage);
    const type = seo.type || 'website';

    this.setPageTitle(seo.title);
    this.setMetaDescription(seo.description);
    this.setCanonical(url);
    this.setRobots(seo.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    if (seo.keywords) {
      this.setMetaKeywords(seo.keywords);
    }

    this.setOpenGraphTags({
      title: seo.title,
      description: seo.description,
      image,
      url,
      type
    });

    this.setTwitterCard({
      title: seo.title,
      description: seo.description,
      image
    });

    if (type === 'article' && seo.article) {
      this.setArticleMeta(seo.article);
    } else {
      this.clearArticleMeta();
    }
  }

  setPageTitle(title: string) {
    const full = title.includes(this.siteName) ? title : `${title} | ${this.siteName}`;
    this.title.setTitle(full);
  }

  setMetaDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setMetaKeywords(keywords: string) {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  setRobots(content: string) {
    this.meta.updateTag({ name: 'robots', content });
  }

  /** A single canonical <link> — required for SPAs, where crawlers see many URLs for one document. */
  setCanonical(url: string) {
    const href = this.absoluteUrl(url);
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  setOpenGraphTags(data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  }) {
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    if (data.title) {
      this.meta.updateTag({ property: 'og:title', content: data.title });
    }
    if (data.description) {
      this.meta.updateTag({ property: 'og:description', content: data.description });
    }
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: this.absoluteUrl(data.image) });
      this.meta.updateTag({ property: 'og:image:alt', content: data.title || this.siteName });
    }
    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: this.absoluteUrl(data.url) });
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
      this.meta.updateTag({ name: 'twitter:image', content: this.absoluteUrl(data.image) });
    }
  }

  setArticleMeta(article: ArticleSeo) {
    this.meta.updateTag({ property: 'article:author', content: this.siteName });
    this.meta.updateTag({ property: 'article:published_time', content: article.publishedTime });
    this.meta.updateTag({
      property: 'article:modified_time',
      content: article.modifiedTime || article.publishedTime
    });
    if (article.section) {
      this.meta.updateTag({ property: 'article:section', content: article.section });
    }
    // Tags are repeated, so clear the previous article's before adding these.
    this.meta.getTags('property="article:tag"').forEach(tag => tag.remove());
    (article.tags || []).forEach(tag => {
      this.meta.addTag({ property: 'article:tag', content: tag });
    });
  }

  /** Article tags survive client-side navigation, so non-article pages must strip them. */
  clearArticleMeta() {
    ['article:author', 'article:published_time', 'article:modified_time', 'article:section', 'article:tag']
      .forEach(prop => this.meta.getTags(`property="${prop}"`).forEach(tag => tag.remove()));
  }

  /**
   * Add or replace a JSON-LD block. `key` identifies the block so a later page
   * overwrites it instead of stacking duplicate structured data.
   */
  setJsonLd(key: string, data: Record<string, any>) {
    this.removeJsonLd(key);
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', key);
    script.text = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  removeJsonLd(key: string) {
    this.doc.head
      .querySelectorAll(`script[type="application/ld+json"][data-seo="${key}"]`)
      .forEach(node => node.remove());
  }

  /** Turns 'assets/x.png' or '/blog/y' into a fully-qualified URL. */
  absoluteUrl(pathOrUrl: string): string {
    if (!pathOrUrl) {
      return this.siteUrl;
    }
    if (/^https?:\/\//i.test(pathOrUrl)) {
      return pathOrUrl;
    }
    return `${this.siteUrl}/${pathOrUrl.replace(/^\/+/, '')}`;
  }
}
