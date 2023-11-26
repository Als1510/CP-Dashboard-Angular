import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = new BehaviorSubject<string>('');

  constructor(
    private _localStorageService: LocalStorageService
  ) {
    const currentTheme = this._localStorageService.getTheme();
    this.setTheme(currentTheme);
  }

  setTheme(theme: string) {
    this.theme.next(theme);
    this._localStorageService.setTheme(theme);
  }
}
