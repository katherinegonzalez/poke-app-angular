import { Component, OnInit, AfterContentInit, DoCheck } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  animations: [
    trigger('asideAnimation', [
      state('close', style({
        width: '50px',
      })),
      state('open', style({
        width: '100%'
      })),
      transition('open => close', animate('100ms ease-out')),
      transition('close => open', animate('100ms ease-in'))
    ])
  ]
})
export class CoreComponent implements OnInit {

  stateAside$: Observable<string> = this.store.pipe(select(fromRoot.getShowSideNav));

  isSidebarClosed: Boolean = false;

  state: string = null;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router) {
      if (localStorage.getItem('angularPokeApp') === undefined || localStorage.getItem('angularPokeApp') === null ) {
        this.router.navigate(['/login']);
          return;
      } else {
        const userLocalstorage = JSON.parse(localStorage.getItem('angularPokeApp')).user;
        if (userLocalstorage === undefined || userLocalstorage === null) {
          this.router.navigate(['/login']);
          return;
        }
      }
    }


  /*ngAfterContentInit() {
    const userLocalstorage = JSON.parse(localStorage.getItem('angularPokeApp')).user;
    if (userLocalstorage === undefined || userLocalstorage === null) {
      this.router.navigate(['/login']);
      return;
    }
  }*/

  ngOnInit() {

      this.stateAside$.subscribe (
        state => {
          this.state = state;
        }
      );
  }

  clickSidebar(event) {
    this.isSidebarClosed = event;
  }

}
