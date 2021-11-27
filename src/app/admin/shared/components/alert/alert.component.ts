import { Subscription } from 'rxjs';
import { AlertService } from './../../services/alert.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000

  aSub?: Subscription

  public text: string = ''
  public type = 'success'

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.aSub = this.alertService.alert$.subscribe( alert => {
      this.text = alert.text
      this.type = alert.type

      //очистка алерта
      const timeout = setTimeout( () => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
