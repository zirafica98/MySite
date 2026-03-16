import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  public isDarkMode = signal<boolean>(false);

  constructor() {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }

    // Apply theme to document
    this.applyTheme(this.isDarkMode());

    // Watch for changes and persist
    effect(() => {
      const isDark = this.isDarkMode();
      this.applyTheme(isDark);
      localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.isDarkMode.update(value => !value);
  }

  setTheme(isDark: boolean) {
    this.isDarkMode.set(isDark);
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
