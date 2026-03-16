import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-beige-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div class="text-center max-w-2xl mx-auto">

        <!-- Animated 404 number -->
        <div class="relative mb-8 select-none">
          <span class="text-[180px] md:text-[240px] font-black text-gray-100 dark:text-gray-800 leading-none block">
            404
          </span>
          <span class="absolute inset-0 flex items-center justify-center text-[180px] md:text-[240px] font-black
                       text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-primary-600 leading-none
                       opacity-20 blur-sm">
            404
          </span>
          <!-- Floating icon in the middle of 404 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/40
                        animate-bounce">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Text -->
        <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Looks like this page took a wrong turn. It might have been moved, deleted, or you may have mistyped the URL.
        </p>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/"
             class="inline-flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900
                    px-8 py-4 rounded-xl font-bold text-sm hover:bg-primary-500 dark:hover:bg-primary-500
                    dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary-500/30 hover:shadow-xl">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Back to Home
          </a>
          <a routerLink="/blog"
             class="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                    px-8 py-4 rounded-xl font-bold text-sm border border-gray-200 dark:border-gray-700
                    hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-500 dark:hover:text-primary-400
                    transition-all duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            Read the Blog
          </a>
        </div>

        <!-- Decorative dots -->
        <div class="mt-16 flex justify-center gap-2">
          <span class="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style="animation-delay: 0ms"></span>
          <span class="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style="animation-delay: 150ms"></span>
          <span class="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style="animation-delay: 300ms"></span>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {}
