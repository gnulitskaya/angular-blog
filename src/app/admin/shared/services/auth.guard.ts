import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isAuthenticated()) {
    //если пользователь авторизован
    } else {
      //очистка данных
      this.auth.logout()
      //редирект
      this.router.navigate(['/admin', 'login'], {
        //добавление квери параметров
        queryParams: {
          loginAgain: true
        }
      })
    }
    return true
  }

}
