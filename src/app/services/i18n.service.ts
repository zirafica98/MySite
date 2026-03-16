import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export type Language = 'sr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  public currentLanguage = signal<Language>('sr');
  private translations: Record<Language, Record<string, any>> = {
    sr: {},
    en: {}
  };
  private translationsLoaded = false;

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'sr' || savedLang === 'en')) {
      this.currentLanguage.set(savedLang);
    }
    this.loadTranslations();
  }

  private loadTranslations() {
    if (this.translationsLoaded) return;
    
    this.http.get<Record<string, any>>('/assets/i18n/sr.json').subscribe({
      next: (data) => {
        this.translations.sr = data;
      },
      error: () => {
        console.warn('Failed to load Serbian translations');
      }
    });

    this.http.get<Record<string, any>>('/assets/i18n/en.json').subscribe({
      next: (data) => {
        this.translations.en = data;
      },
      error: () => {
        console.warn('Failed to load English translations');
      }
    });

    this.translationsLoaded = true;
  }

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }

  translate(key: string): string {
    const lang = this.currentLanguage();
    const keys = key.split('.');
    let value: any = this.translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  setTranslations(lang: Language, translations: Record<string, any>) {
    this.translations[lang] = { ...this.translations[lang], ...translations };
  }
}
