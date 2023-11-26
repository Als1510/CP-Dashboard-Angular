import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  theme: string;

  constructor(
    private _authService: AuthService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    this._themeService.theme.subscribe((val) => {
      this.theme = val;
    })
  }

  googleAuth() {
    this._authService.googleAuth();
  }

  githubAuth() {
    this._authService.githubAuth();
  }

}
