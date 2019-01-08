import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  isSidebarClosed: Boolean = false;
  constructor() { }

  ngOnInit() {
    console.log(window);
  }

  clickSidebar(event) {
    console.log(event);
    this.isSidebarClosed = event;
  }

  getSearch(event) {
    console.log(event);
  }

}
