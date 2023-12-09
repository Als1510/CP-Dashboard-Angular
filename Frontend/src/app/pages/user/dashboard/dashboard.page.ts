import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  contestsData: any = [];
  contestPlatforms: any = [];
  selectedPlatforms: any = [];
  contests: any = [];
  time = new Array()
  registeredPlatform = 0;
  value = 0;
  name: string;
  username: string;
  theme: string;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    loop: true,
  };

  constructor(
    private _contestService: ContestService,
    private _utilService: UtilService,
    private _loaderService: LoaderService,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    this.getUserData()
    this.getPlatforms()
    this.getUpcomingContest()
  }

  showUser() {
    if (document.body.clientWidth < 480) {
      document.getElementById('user').classList.add('hide')
      document.getElementById('username').style.display = 'block'
      document.getElementById('name').style.display = 'block'
      setTimeout(() => {
        document.getElementById('user').classList.remove('hide')
        document.getElementById('username').style.display = ''
        document.getElementById('name').style.display = ''
      }, 2500)
    }
  }

  getUserData() {
    this.name = this._localStorageService.getName();
    this.username = this._localStorageService.getUserName();
  }

  platformChange(data) {
    this.selectedPlatforms = data;
    this.filterContestsByPlatform();
  }

  filterContestsByPlatform() {
    this.contests = (this.selectedPlatforms.length) ? this.contestsData.filter(contest => this.selectedPlatforms.includes(contest.platform)) : this.contestsData;
  }

  getPlatforms() {
    this._userService.getPlatforms().subscribe(
      data => {
        for (let prop in data['platformData'].platform) {
          if (data['platformData'].platform[prop])
            this.registeredPlatform++
        }
        this.value = 20 * this.registeredPlatform
      }
    )
  }

  async getUpcomingContest() {
    this._contestService.getAllUpcomingOngoingContest().subscribe(
      data => {
        this.contestsData = data;
        this.contestPlatforms = [...new Set(this.contestsData.map(contest => contest.platform))];
        this.filterContestsByPlatform();
        this._loaderService.isLoading.next(false);
      }
    )
  }
}
