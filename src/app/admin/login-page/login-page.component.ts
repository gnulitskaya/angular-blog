import { User } from './../../shared/components/interfaces';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  submit() {
    if(this.form.invalid){return}

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
  }

}
