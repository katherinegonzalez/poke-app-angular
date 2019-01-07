import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  @Output() sidebarClosed = new EventEmitter<boolean>();
  isSidebarClosed: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  clickSideBar() {
    if (this.isSidebarClosed) {
      this.isSidebarClosed = false;
      this.sidebarClosed.emit(false);
    } else {
      this.isSidebarClosed = true;
      this.sidebarClosed.emit(true);
    }
  }

}
