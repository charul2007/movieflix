import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

  constructor(public angularfire: AngularFire) { }

  loginWithGoogle() {
  	return this.angularfire.auth.login({
  		provider: AuthProviders.Google,
  		method: AuthMethods.Popup
  	})
  }

  logoutWithGoogle() {
  	return this.angularfire.auth.logout();
  }

  isAuthenticated() {
    return this.angularfire.auth.subscribe((auth) => {
      if (auth == null) {
        return;
      }
      else {
        return true;
      }
    })
  };
}
