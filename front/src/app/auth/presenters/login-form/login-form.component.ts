import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


export type LoginForm = FormGroup<{
  userName: FormControl<string>,
  password: FormControl<string>
}>

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{
  loginForm:LoginForm = this.fb.nonNullable.group({
    userName: ["", Validators.required],
    password: ["", Validators.required]
  })

  constructor(
    private fb: FormBuilder
  ) {}

  get valid():boolean{
    return this.loginForm.valid
  }
}
