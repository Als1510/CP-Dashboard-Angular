import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-menubutton',
  templateUrl: './menubutton.component.html',
  styleUrls: ['./menubutton.component.scss'],
})
export class MenubuttonComponent implements OnInit {

  toggle_by_button = false
  name
  username
  theme

  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    this.name = this._localStorageService.getName()
    this.username = this._localStorageService.getUserName()
    this._themeService.theme.subscribe((val) => {
      this.theme = val;
    })
  }

  toggleBtn() {
    let btn = document.querySelector('#btn');
    let sidebar = document.querySelector('.sidebar')
    btn.classList.toggle('active')
    sidebar.classList.toggle('active')
    if (this.toggle_by_button) {
      this.toggle_by_button = false
    } else {
      this.toggle_by_button = true
    }
  }

  overBtn() {
    let btn = document.querySelector('#btn');
    let sidebar = document.querySelector('.sidebar')
    if (!this.toggle_by_button) {
      btn.classList.toggle('active')
      sidebar.classList.toggle('active')
    }
  }

  outBtn() {
    let btn = document.querySelector('#btn');
    let sidebar = document.querySelector('.sidebar')
    if (!this.toggle_by_button) {
      btn.classList.remove('active')
      sidebar.classList.remove('active')
    }
  }

  clickEvent(data) {
    this._router.navigate([data])
  }

  logout() {
    this._localStorageService.logout()
    this._router.navigate(['/home']);
  }
}
