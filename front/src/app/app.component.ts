import {Component, OnInit} from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';
  showSideBar: boolean = true;

  ngOnInit() {
    initFlowbite();
  }

  handleNewSideBarState(value:boolean) {
    this.showSideBar = value;
    console.log(this.showSideBar)
  }
}
