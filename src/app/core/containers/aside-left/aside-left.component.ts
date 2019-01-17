import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.css']
})
export class AsideLeftComponent implements OnInit {

  user: {name: string, photoUrl: string};
  @Input() asideState: string;

  constructor() { }

  ngOnInit() {

    /*this.user = {
      name: 'Usuario Prueba',
      photoUrl: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    };*/
    const userLocalstorage = JSON.parse(localStorage.getItem('angularPokeApp')).user;
    this.user = {
      name: userLocalstorage.displayName,
      photoUrl: userLocalstorage.photoURL
    };
  }

}
