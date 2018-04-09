import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  canActivate(): boolean {
      // tslint:disable-next-line:whitespace
      if(this.settingsService.getSettings().allowRegistration) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
