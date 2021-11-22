import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from "../../../../environments/environment";
import {FbAuthResponse, User} from "../../../shared/interfaces";

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {}
  // $ - стрим
  // Subject тот же Observable, дополнительно можем эмитить у него события
  public error$: Subject<string> = new Subject<string>()

  //получение токена
  get token(): string | null {
    //дата истечения токена
    const storedExpDate = localStorage.getItem('fb-token-exp');
    const expDate: Date | null = storedExpDate != null ? new Date(storedExpDate) : null;
    //если текушая дата больше чем дата истечения токена (по времени дальше, чем дата жизни токена)
    if (expDate == null || new Date() > expDate) {
      //очистка логики по токену
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
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  //авторизован пользователь или нет
  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    //обработка ошибки
    const {message} = error.error.error
    console.log(message)
    switch (message) {
      case 'INVALID_EMAIL':
        //диспачим то сообщение которое необходимо вывести
        this.error$.next('Wrong email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Do not have this email')
        break
    }
    //возвращение observable из ошибки
    return throwError(error)
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
