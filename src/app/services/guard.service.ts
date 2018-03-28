import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class GuardService implements CanActivate {

  constructor(public angularfire: AngularFire,
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.angularfire.auth.map((auth) =>  {
      if(auth == null) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })
  }

}
