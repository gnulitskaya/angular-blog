import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

export type AlertType = 'success' | 'warning' | 'danger'

export interface Alert {
  type: AlertType
  text: string
}

@Injectable()

export class AlertService {
  public alert$ = new Subject<Alert>()
  //вызывая определённый метод мы будем диспачить для алерта новый объект
  //который юудет показывать нам его
  success(text: string) {
    this.alert$.next({type: 'success', text})
  }
  warning(text: string) {
    this.alert$.next({type: 'warning', text})
  }
  danger(text: string) {
    this.alert$.next({type: 'danger', text})
  }
}
