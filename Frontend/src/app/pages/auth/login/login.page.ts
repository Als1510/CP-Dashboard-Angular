import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup
  hide = false

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _loaderService: LoaderService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    const token = this._activatedRoute.snapshot.queryParamMap.get('token');
    if (token) {
      this.setUserAndNavigate(token)
    }
    this.loginForm = this._formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  eye() {
    this.hide = !this.hide
  }

  onSubmit() {
    let email = this.loginForm.get('email').value.toLowerCase()
    let password = this.loginForm.get('password').value
    this._authService.login(email, password).subscribe(
      async (data) => {
        this._loaderService.isLoading.next(false)
        this.setUserAndNavigate(data['token'])
        this.loginForm.reset()
      }
    )
  }

  setUserAndNavigate(data) {
    let decodedToken = jwtDecode(data);
    this._localStorageService.saveNameIdUserName(decodedToken['name'], decodedToken['id'], decodedToken['username'])
    this._localStorageService.setToken(data)
    this._router.navigate(['/User/dashboard'])
  }
}
