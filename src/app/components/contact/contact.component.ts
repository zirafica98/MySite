import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { AnalyticsService } from '../../services/analytics.service';

// ─── EmailJS config ────────────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// 2. Create a new Email Service and note your SERVICE_ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}},
//    {{subject}}, {{message}} — and note your TEMPLATE_ID
// 4. Go to Account → API Keys and copy your PUBLIC_KEY
// 5. Replace the three placeholders below:
const EMAILJS_SERVICE_ID  = 'service_0pyow2l';
const EMAILJS_TEMPLATE_ID = 'template_i99vixo';
const EMAILJS_PUBLIC_KEY  = 'j3TtH6gnpku0_RNFR';
// ───────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AnimateOnScrollDirective],
  template: `
    <section id="contact" class="py-24 bg-beige-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">

      <!-- Background blobs -->
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-primary-500/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      <div class="absolute top-0 left-0 w-56 h-56 bg-gray-900/3 rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div class="container mx-auto px-4 relative z-10">

        <!-- Header -->
        <div class="text-center mb-16" animateOnScroll="fade-up">
          <span class="text-primary-500 text-sm uppercase tracking-widest font-semibold">Say Hello</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mt-3">Get In Touch</h2>
          <p class="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to chat about tech?
            My inbox is always open.
          </p>
        </div>

        <div class="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12">

          <!-- Left: Contact Info -->
          <div class="lg:col-span-2" animateOnScroll="fade-right">

            <!-- Quick links -->
            <div class="space-y-4 mb-10">
              <a href="mailto:mihajlop98@gmail.com"
                 class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-300 dark:hover:border-primary-500 transition-all group">
                <div class="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg class="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Email</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm">mihajlop98&#64;gmail.com</div>
                </div>
              </a>

              <a href="tel:+381677873685"
                 class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-300 dark:hover:border-primary-500 transition-all group">
                <div class="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg class="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Phone</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm">+381 67 787 3685</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/mihajlo-petrovic-355810197/" target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-300 dark:hover:border-primary-500 transition-all group">
                <div class="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg class="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-400 uppercase tracking-wider mb-0.5">LinkedIn</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm">Mihajlo Petrovic</div>
                </div>
              </a>

              <a href="https://github.com/zirafica98" target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-300 dark:hover:border-primary-500 transition-all group">
                <div class="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <svg class="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-400 uppercase tracking-wider mb-0.5">GitHub</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm">zirafica98</div>
                </div>
              </a>

              <div class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div class="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Location</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm">Belgrade, Serbia</div>
                </div>
              </div>
            </div>

            <!-- Availability note -->
            <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-center gap-3">
              <div class="w-3 h-3 bg-green-400 rounded-full flex-shrink-0 animate-pulse"></div>
              <p class="text-green-700 dark:text-green-400 text-sm font-medium">Available for freelance & collaborations</p>
            </div>

          </div>

          <!-- Right: Form -->
          <div class="lg:col-span-3" animateOnScroll="fade-left" [animDelay]="150">
            <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-8 md:p-10">

              <!-- Success state -->
              <div *ngIf="submitted" class="text-center py-8">
                <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 class="text-xl font-black text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button (click)="resetForm()"
                        class="px-6 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Send another message
                </button>
              </div>

              <!-- Form -->
              <form *ngIf="!submitted" [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">

                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      formControlName="name"
                      placeholder="John Doe"
                      class="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-700 transition-all"
                      [class]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched
                        ? 'border-red-400 dark:border-red-500'
                        : 'border-gray-200 dark:border-gray-600'">
                    <div *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
                         class="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                      Name is required
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      formControlName="email"
                      placeholder="you@example.com"
                      class="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-700 transition-all"
                      [class]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched
                        ? 'border-red-400 dark:border-red-500'
                        : 'border-gray-200 dark:border-gray-600'">
                    <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                         class="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                      A valid email is required
                    </div>
                  </div>
                </div>

                <div>
                  <label for="subject" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    formControlName="subject"
                    placeholder="What's this about?"
                    class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-700 transition-all">
                </div>

                <div>
                  <label for="message" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                  <textarea
                    id="message"
                    formControlName="message"
                    rows="5"
                    placeholder="Tell me about your project or idea..."
                    class="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-700 transition-all resize-none"
                    [class]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched
                      ? 'border-red-400 dark:border-red-500'
                      : 'border-gray-200 dark:border-gray-600'"></textarea>
                  <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
                       class="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    Message is required
                  </div>
                </div>

                <!-- Error banner -->
                <div *ngIf="sendError"
                     class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-3 text-sm">
                  <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                  </svg>
                  {{ sendError }}
                </div>

                <button
                  type="submit"
                  [disabled]="contactForm.invalid || sending"
                  class="w-full bg-gray-900 dark:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl
                         hover:bg-primary-500 dark:hover:bg-primary-500
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 shadow-lg hover:shadow-primary-500/30 hover:shadow-xl">
                  <!-- Send icon -->
                  <svg *ngIf="!sending" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  <!-- Spinner -->
                  <svg *ngIf="sending" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  {{ sending ? 'Sending...' : 'Send Message' }}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  sending = false;
  sendError = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private analytics: AnalyticsService) {
    this.contactForm = this.fb.group({
      name:    ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.sending = true;
    this.sendError = '';

    const { name, email, subject, message } = this.contactForm.value;

    const payload = {
      service_id:  EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id:     EMAILJS_PUBLIC_KEY,   // older field
      accessToken: EMAILJS_PUBLIC_KEY,   // newer field (v4+)
      template_params: {
        from_name:  name,
        from_email: email,
        subject:    subject || '(No subject)',
        message
      }
    };

    this.http.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      payload,
      { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
    ).subscribe({
      next: () => {
        this.sending = false;
        this.submitted = true;
        this.contactForm.reset();
        this.analytics.trackEvent('contact_form_submit', { event_category: 'engagement' });
      },
      error: (err) => {
        this.sending = false;
        const status = err?.status;
        const body   = err?.error;
        console.error('EmailJS error:', status, body);
        if (status === 400) {
          this.sendError = `EmailJS config error (400): ${body}`;
        } else if (status === 403) {
          this.sendError = 'EmailJS: Invalid public key (403). Check Account → API Keys.';
        } else if (status === 404) {
          this.sendError = 'EmailJS: Service or Template ID not found (404). Check your IDs.';
        } else {
          this.sendError = `Send failed (${status}). Check browser console for details.`;
        }
      }
    });
  }

  resetForm() {
    this.submitted = false;
    this.sendError = '';
    this.contactForm.reset();
  }
}
