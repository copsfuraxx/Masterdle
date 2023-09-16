import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, of} from "rxjs";
import {User} from "../../user/user.model";
import {LoginFormComponent} from "../../auth/presenters/login-form/login-form.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  host: {'class': "sticky top-0 z-30 flex h-16 w-full mb-10 justify-center bg-opacity-90 backdrop-blur transition-all duration-100 text-base-content"}
})
export class NavBarComponent implements OnInit{
  @Output() newSideBarState = new EventEmitter<boolean>();
  @Input() sideBarState: boolean = false;
  @ViewChild("loginFormComponent") loginFormComponent!: LoginFormComponent;
  userAuthentified$: Observable<User|null> = of(null)

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userAuthentified$ = this.authService.userAuthentified$;
  }

  handleClickLogOut() {
    this.authService.logout();
  }

  handleSubmit() {
    this.authService.login(this.loginFormComponent.loginForm.getRawValue());
  }
}
