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
    this.seo.setPageTitle('Mihajlo Petrovic — Software Engineer');
    this.seo.setMetaDescription(
      'Personal portfolio of Mihajlo Petrovic — Software Engineer based in Belgrade. Angular, iOS/Swift, AI-powered products, and full-stack web development.'
    );
    this.seo.setMetaKeywords(
      'Mihajlo Petrovic, Software Engineer, Angular, TypeScript, Swift, iOS, web developer, Belgrade, Serbia, portfolio'
    );
    this.seo.setOpenGraphTags({
      title: 'Mihajlo Petrovic — Software Engineer',
      description:
        'Software Engineer based in Belgrade. Angular, iOS/Swift, AI-powered products, and full-stack web development.',
      url: 'https://mihajlopertrovic.com/',
      image: 'https://mihajlopertrovic.com/assets/logov2-removebg-preview.png',
      type: 'website'
    });
    this.seo.setTwitterCard({
      title: 'Mihajlo Petrovic — Software Engineer',
      description:
        'Software Engineer based in Belgrade. Angular, iOS/Swift, AI-powered products, and full-stack web development.',
      image: 'https://mihajlopertrovic.com/assets/logov2-removebg-preview.png'
    });
  }
}
