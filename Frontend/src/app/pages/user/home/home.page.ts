import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  theme: string;

  constructor(
    private _contestService: ContestService,
    private _loaderService: LoaderService,
    private _utilService: UtilService,
    private _themeService: ThemeService
  ) { }

  contests: any = [];
  element

  ngOnInit() {
    this._loaderService.isLoading.next(true);
    this._themeService.theme.subscribe((val) => {
      this.theme = val;
    })
    this.getUpcomingContest()
    this.element = document.querySelectorAll('.faq_icon')
    this.element.forEach((event) => {
      event.addEventListener('click', () => {
        if (event.classList.contains('rotate')) {
          event.classList.remove('rotate')
          event.nextSibling.style.display = 'none';
        } else {
          event.nextSibling.style.display = 'block';
          event.classList.add('rotate')
        }
      })
    })
  }

  toggleBtn() {
    let ul = document.querySelector('ul');
    ul.classList.toggle('active')
  }

  async getUpcomingContest() {
    this._contestService.getUpcomingOngoingContest().subscribe(
      (data: any) => {
        this.contests = data;
        this._loaderService.isLoading.next(false)
      }
    )
  }

  getBackground() {
    return `url('../../../../assets/${this.theme === 'dark' ? 'home-dark.jpg' : 'home-light.jpg'}') center/cover no-repeat`;
  }
}
