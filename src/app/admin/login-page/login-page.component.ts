import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl([
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor() { }

  ngOnInit() {

  }

  submit() {
    if(this.form.invalid){return}
  }

}
