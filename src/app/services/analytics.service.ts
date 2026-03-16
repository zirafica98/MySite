import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// ─── Replace with your GA4 Measurement ID ─────────────────────────────────────
// 1. Go to analytics.google.com → Admin → Data Streams → your stream
// 2. Copy the Measurement ID (format: G-XXXXXXXXXX)
// 3. Paste it below:
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
// ──────────────────────────────────────────────────────────────────────────────

declare let gtag: Function;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  constructor(private router: Router) {}

  /** Call once from AppComponent.ngOnInit() */
  init(): void {
    if (!this.isEnabled()) { return; }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.trackPageView((event as NavigationEnd).urlAfterRedirects);
      });
  }

  /** Manual page-view tracking (e.g. if you use hash routing) */
  trackPageView(path: string): void {
    if (!this.isEnabled()) { return; }
    try {
      gtag('config', GA_MEASUREMENT_ID, { page_path: path });
    } catch (e) {
      // gtag not loaded yet — silently ignore
    }
  }

  /** Track a custom event */
  trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
    if (!this.isEnabled()) { return; }
    try {
      gtag('event', eventName, params);
    } catch (e) {
      // gtag not loaded yet — silently ignore
    }
  }

  /** Returns false if the ID is still a placeholder, preventing noisy console errors */
  private isEnabled(): boolean {
    return GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';
  }
}
