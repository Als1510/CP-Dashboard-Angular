import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';


@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(
    private _http: HttpClient,
    private _env: EnvService
  ) { }

  // GET Upcoming/OnGoing contests
  getUpcomingOngoingContest() {
    return this._http.get(this._env.Mongo_API_URL + '/contest');
  }

  getAllUpcomingOngoingContest() {
    return this._http.get(this._env.Mongo_API_URL + '/contest/all');
  }
}
