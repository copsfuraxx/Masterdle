import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  showSideBar: boolean = true;

  handleNewSideBarState(value:boolean) {
    this.showSideBar = value;
    console.log(this.showSideBar)
  }
}
