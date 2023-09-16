import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


export type LoginForm = FormGroup<{
  username: FormControl<string>,
  passwrd: FormControl<string>
}>

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{
  loginForm:LoginForm = this.fb.nonNullable.group({
    username: ["", Validators.required],
    passwrd: ["", Validators.required]
  })

  constructor(
    private fb: FormBuilder
  ) {}

  get valid():boolean{
    return this.loginForm.valid
  }
}
