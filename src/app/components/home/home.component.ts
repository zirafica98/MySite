import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { StatsComponent } from '../stats/stats.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, StatsComponent, AboutComponent, ExperienceComponent, ProjectsComponent, ContactComponent, SideNavComponent],
  template: `
    <app-side-nav></app-side-nav>
    <app-hero></app-hero>
    <app-stats></app-stats>
    <app-about></app-about>
    <app-experience></app-experience>
    <app-projects></app-projects>
    <app-contact></app-contact>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.applyPage({
      title: 'Mihajlo Petrovic — Software Engineer',
      description:
        'Personal portfolio of Mihajlo Petrovic — Software Engineer based in Belgrade. Angular, iOS/Swift, AI-powered products, and full-stack web development.',
      path: '/',
      keywords:
        'Mihajlo Petrovic, Software Engineer, Angular, TypeScript, Swift, iOS, SwiftUI, AI agents, web developer, Belgrade, Serbia, portfolio'
    });

    this.seo.setJsonLd('person', {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${this.seo.siteUrl}/#person`,
      name: 'Mihajlo Petrovic',
      url: this.seo.siteUrl,
      image: this.seo.absoluteUrl('assets/myImage.jpg'),
      jobTitle: 'Software Engineer',
      email: 'mailto:mihajlop98@gmail.com',
      worksFor: { '@type': 'Organization', name: 'Raiffeisen Bank' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Belgrade',
        addressCountry: 'RS'
      },
      knowsAbout: [
        'Angular', 'TypeScript', 'Swift', 'SwiftUI', 'iOS development',
        'C#', 'Node.js', 'FinTech', 'AI coding agents'
      ],
      sameAs: ['https://linkedin.com/in/mihajlo-petrovic-355810197/']
    });

    this.seo.setJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Mihajlo Petrovic',
      url: this.seo.siteUrl,
      inLanguage: 'en',
      author: { '@id': `${this.seo.siteUrl}/#person` }
    });
  }
}
