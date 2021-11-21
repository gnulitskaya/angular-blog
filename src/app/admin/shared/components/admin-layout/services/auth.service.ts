import { User } from './../../../../../shared/components/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return ''
  }

  login(user: User): Observable<any> {
    //post запрос чтобы авторизоваться
    return this.http.post('', user)
  }

  logout() {

  }

  //авторизован пользователь или нет
  isAuthenticated(): boolean {
    return !!this.token
  }

  //чтобы изменять токен
  private setToken() {

  }
}
