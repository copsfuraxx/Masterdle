import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable, of, switchMap} from "rxjs";
import {User} from "../../user/user.model";
import {LoginFormComponent} from "../../auth/presenters/login-form/login-form.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  @Output() newSideBarState = new EventEmitter<boolean>();
  @Input() sideBarState: boolean = false;
  @ViewChild("loginFormComponent") loginFormComponent!: LoginFormComponent;
  route$: Observable<string> = new Observable<string>();
  userAuthentified$: Observable<User|null> = of(null)

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route$ = this.router.events.pipe(
      switchMap(() =>
      {
        return of(this.router.url.split('/')[1]);
      })
    );
    this.userAuthentified$ = this.authService.userAuthentified$;
  }

  handleSwitchSideBar() {
    this.sideBarState = !this.sideBarState;
    this.newSideBarState.emit(this.sideBarState);
  }

  handleClickLogOut() {
    this.authService.logout();
  }

  handleSubmit() {
    this.authService.login(this.loginFormComponent.loginForm.getRawValue());
  }
}
