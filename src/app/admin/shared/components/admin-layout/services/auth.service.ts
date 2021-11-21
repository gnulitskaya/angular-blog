import { environment } from './../../../../../../environments/environment';
import { User, FbAuthResponse } from './../../../../../shared/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    const storedExpDate = localStorage.getItem('fb-token-exp');
    const expDate: Date | null = storedExpDate != null ? new Date(storedExpDate) : null;
    if (expDate == null || new Date() > expDate) {
      this.logout()
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    //post запрос чтобы авторизоваться
    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe (
        tap(this.setToken)
      )
  }

  logout() {
    this.setToken(null)
  }

  //авторизован пользователь или нет
  isAuthenticated(): boolean {
    return !!this.token
  }

  //чтобы изменять токен
  private setToken(response: FbAuthResponse | null) {
      // console.log(response)
    if (response) {
      //дата когда токен истечёт
      //приходит 3600s, нужно мили
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      //сохранили данные токена в localstorage
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
