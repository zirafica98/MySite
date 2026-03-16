import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section id="about" class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-24 relative overflow-hidden transition-colors duration-300">

      <!-- Subtle grid background -->
      <div class="absolute inset-0 opacity-[0.04] dark:opacity-5"
           style="background-image: linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px);
                  background-size: 60px 60px;">
      </div>

      <!-- Orange blobs -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500 opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-primary-500 opacity-5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div class="container mx-auto px-4 relative z-10">

        <!-- Section Label -->
        <div class="text-center mb-16" animateOnScroll="fade-up">
          <span class="text-primary-500 dark:text-primary-400 text-sm uppercase tracking-widest font-semibold">About Me</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-3 text-gray-900 dark:text-white">
            The Person<br>
            <span class="text-primary-500">Behind the Code</span>
          </h2>
        </div>

        <!-- Main Grid -->
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24">

          <!-- Left: Photo -->
          <div animateOnScroll="fade-right" class="relative flex justify-center lg:justify-start">
            <div class="relative">
              <!-- Decorative frame -->
              <div class="absolute -top-4 -left-4 w-full h-full border-2 border-primary-500/40 rounded-2xl"></div>
              <img src="assets/myImage.jpg" alt="Mihajlo Petrovic"
                   class="relative z-10 w-full max-w-sm rounded-2xl object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <!-- Badge -->
              <div class="absolute -bottom-6 -right-6 z-20 bg-primary-500 text-white rounded-2xl p-4 shadow-xl">
                <div class="text-2xl font-black">5+</div>
                <div class="text-xs font-semibold uppercase tracking-wider">Years Exp.</div>
              </div>
            </div>
          </div>

          <!-- Right: Info -->
          <div animateOnScroll="fade-left" [animDelay]="150">
            <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              I'm a Software Engineer based in <strong class="text-gray-900 dark:text-white">Belgrade, Serbia</strong>,
              currently building digital banking solutions at <strong class="text-primary-500 dark:text-primary-400">Raiffeisen Bank</strong>.
              I specialize in web and mobile applications with a strong focus on Angular, TypeScript, and iOS development.
            </p>

            <!-- Stat pills -->
            <div class="grid grid-cols-3 gap-4 mb-10">
              <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
                <div class="text-3xl font-black text-primary-500">5+</div>
                <div class="text-gray-500 dark:text-gray-400 text-xs mt-1 uppercase tracking-wider">Years</div>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
                <div class="text-3xl font-black text-primary-500">50+</div>
                <div class="text-gray-500 dark:text-gray-400 text-xs mt-1 uppercase tracking-wider">Projects</div>
              </div>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
                <div class="text-3xl font-black text-primary-500">3K+</div>
                <div class="text-gray-500 dark:text-gray-400 text-xs mt-1 uppercase tracking-wider">Users/mo</div>
              </div>
            </div>

            <!-- Contact quick links -->
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Belgrade, Serbia</span>
              </div>
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a [href]="'mailto:' + email" class="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors">{{ email }}</a>
              </div>
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+381677873685" class="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors">+381 67 787 3685</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Education & Certifications -->
        <div class="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20" animateOnScroll="fade-up" [animDelay]="100">

          <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <h3 class="text-2xl font-black mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
              <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
              </div>
              Education
            </h3>
            <div class="space-y-6">
              <div class="relative pl-6 border-l-2 border-primary-500/40">
                <div class="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-1">Bachelor in Computer Engineering</h4>
                <p class="text-gray-500 dark:text-gray-400 text-sm">School of Electrical and Computer Engineering of Applied Studies</p>
                <p class="text-primary-500 text-xs font-semibold mt-1">2016 — 2019</p>
              </div>
              <div class="relative pl-6 border-l-2 border-gray-300 dark:border-gray-700">
                <div class="absolute -left-2 top-0 w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-1">High School — Electrotechnical School "Nikola Tesla"</h4>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Electrical Engineering and Computer Science</p>
                <p class="text-gray-500 dark:text-gray-500 text-xs font-semibold mt-1">2012 — 2016</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <h3 class="text-2xl font-black mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
              <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              Certifications
            </h3>
            <div class="space-y-6">
              <div class="relative pl-6 border-l-2 border-primary-500/40">
                <div class="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-1">Developing ASP.NET MVC 5 Web Applications</h4>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Microsoft</p>
                <p class="text-primary-500 text-xs font-semibold mt-1">2022</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div animateOnScroll="fade-up" [animDelay]="50">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-black text-gray-900 dark:text-white">Technical Skills</h3>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
              <div class="text-primary-500 font-bold text-xs uppercase tracking-widest mb-4">Frontend</div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let s of frontendSkills" class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-300 transition-colors cursor-default">{{ s }}</span>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
              <div class="text-primary-500 font-bold text-xs uppercase tracking-widest mb-4">Backend</div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let s of backendSkills" class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-300 transition-colors cursor-default">{{ s }}</span>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
              <div class="text-primary-500 font-bold text-xs uppercase tracking-widest mb-4">Mobile</div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let s of mobileSkills" class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-300 transition-colors cursor-default">{{ s }}</span>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
              <div class="text-primary-500 font-bold text-xs uppercase tracking-widest mb-4">Tools & Other</div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let s of otherSkills" class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-300 transition-colors cursor-default">{{ s }}</span>
              </div>
            </div>
          </div>

          <!-- Languages -->
          <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div class="text-primary-500 font-bold text-xs uppercase tracking-widest mb-4">Languages</div>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-900 dark:text-white font-medium">Serbian</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">Native</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-primary-400 rounded-full"></div>
                <span class="text-gray-900 dark:text-white font-medium">English</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">Advanced (B2)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent {
  email = 'mihajlop98@gmail.com';

  frontendSkills = ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'SASS/LESS', 'Knockout.js', 'jQuery', 'Tailwind CSS'];
  backendSkills = ['C#', 'Java', 'Node.js', 'Express.js', 'PHP', 'Python', 'Django', 'REST APIs'];
  mobileSkills = ['Swift', 'SwiftUI', 'iOS'];
  otherSkills = ['Camunda 7', 'FormsEngine', 'SQL Server', 'MySQL', 'Git', 'Magento', 'WordPress', 'Jira', 'Agile'];
}
