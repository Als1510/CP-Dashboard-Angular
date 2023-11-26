import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../services/localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformGuard implements CanActivate {

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let platform = this._localStorageService.getPlatform()
    if (platform)
      if (platform[Object.keys(platform)[0]])
        return true
    return false;
  }
}
