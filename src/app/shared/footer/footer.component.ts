import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-gray-900 text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="grid md:grid-cols-3 gap-12 mb-12">

          <!-- Brand -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center font-black text-white">MP</div>
              <span class="text-xl font-black">Mihajlo Petrovic</span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
              Software Engineer based in Belgrade, Serbia.
              Building web & mobile solutions that people actually use.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Navigation</h4>
            <ul class="space-y-3">
              <li><a routerLink="/" class="text-gray-300 hover:text-primary-400 transition-colors text-sm">Home</a></li>
              <li><a routerLink="/#about" class="text-gray-300 hover:text-primary-400 transition-colors text-sm">About</a></li>
              <li><a routerLink="/#projects" class="text-gray-300 hover:text-primary-400 transition-colors text-sm">Projects</a></li>
              <li><a routerLink="/blog" class="text-gray-300 hover:text-primary-400 transition-colors text-sm">Blog</a></li>
              <li><a routerLink="/#contact" class="text-gray-300 hover:text-primary-400 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          <!-- Connect -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Connect</h4>
            <div class="space-y-3">
              <a href="https://linkedin.com/in/mihajlo-petrovic-355810197/" target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors group">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span class="text-sm">LinkedIn</span>
              </a>
              <a href="mailto:mihajlop98@gmail.com"
                 class="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors group">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span class="text-sm">mihajlop98&#64;gmail.com</span>
              </a>
              <a href="tel:+381677873685"
                 class="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors group">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span class="text-sm">+381 67 787 3685</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-gray-500 text-sm">
            &copy; {{ currentYear }} Mihajlo Petrovic. All rights reserved.
          </p>
          <p class="text-gray-600 text-xs">
            Built with Angular & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
