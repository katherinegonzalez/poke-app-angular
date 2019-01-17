import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as layout from '../../actions/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  @Output() sidebarClosed = new EventEmitter<boolean>();
  isSidebarClosed: Boolean = false;
  user: {name: string, photoUrl: string};

  state: string;
  stateAside$: Observable<string> = this.store.pipe(select(fromRoot.getShowSideNav));

  constructor(private store: Store<fromRoot.State>) {
    this.stateAside$.subscribe(
      aside => {
        this.state = aside;
      }
    );
  }

  ngOnInit() {
    const userLocalstorage = JSON.parse(localStorage.getItem('angularPokeApp')).user;
    this.user = {
      name: userLocalstorage.displayName,
      photoUrl: userLocalstorage.photoURL
    };
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

  open() {
    if (this.state === 'close') {
      this.store.dispatch(new layout.OpenSideNav());
    } else {
      this.store.dispatch(new layout.CloseSideNav());
    }
  }

}
