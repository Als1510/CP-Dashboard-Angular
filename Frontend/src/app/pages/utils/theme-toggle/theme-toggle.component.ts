import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {

  currentTheme: string;
  constructor(
    private _themeService: ThemeService,
  ) { }

  ngOnInit() {
    this._themeService.theme.subscribe((value) => {
      this.currentTheme = value;
    })
  }

  changeTheme() {
    setTimeout(() => {
      this.currentTheme = (this.currentTheme === 'dark') ? '' : 'dark';
      this._themeService.setTheme(this.currentTheme)
    }, 10)
  }

}
