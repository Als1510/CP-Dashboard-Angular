import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() { }


  googleAuth() {
    this._authService.googleAuth();
  }

  githubAuth() {
    this._authService.githubAuth();
  }

}
