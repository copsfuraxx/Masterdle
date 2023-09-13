import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isConnected: boolean = false;
  route$: Observable<string> = new Observable<string>();

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
   this.isConnected = this.authService.isAuthenticatedUser();
   console.log(this.isConnected);
  }

  ngOnInit(): void {
    this.route$ = this.router.events.pipe(
      switchMap(() =>
      {
        return of(this.router.url.split('/')[1]);
      })
    );
  }

  handleClickLogIn() {
    this.router.navigate(['login']);
  }
}
