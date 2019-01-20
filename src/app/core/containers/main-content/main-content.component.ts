import { Component, OnInit } from '@angular/core';
import { IMessage } from 'src/app/alerts/models/interfaces/message';
import {MessagesService} from 'src/app/alerts/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  section: string;
  constructor(
    private msgService: MessagesService,
    private router: Router) { }

  ngOnInit() {
    window.addEventListener('online', this.updateIndicator.bind(this)); // para que dentro del
                                                                        // contexto de la funciòn el this sea el mismo de la clase
    window.addEventListener('offline', this.updateIndicator.bind(this));

    window.addEventListener('click', this.getClickToIdentifySection.bind(this));

    this.getSection();
  }

  updateIndicator(event) {
    let msg: IMessage = {msg: '', type: ''};

    if ( event.type === 'online' ) {
      msg.msg = 'Se ha establecido conexión de red';
      msg.type = 'success';
    } else if (event.type === 'offline') {
      msg.msg = 'Se ha perdido conexión de red';
      msg.type = 'error';
    }

    this.msgService.message(msg);

  }

  getSection() {
    if (this.router.url.includes('favorites')) {
      this.section = 'Favoritos';
    }

    if (this.router.url.includes('collections')) {
      this.section = 'Colecciones';
    }

    if (this.router.url.includes('pokemons')) {
      this.section = 'Pokemons';
    }
  }

  getClickToIdentifySection(event) {

    switch (event.path[1].id) {
      case 'pokemonsMenu':
        this.section = 'Pokemons';
        break;
      case 'coleccionesMenu':
        this.section = 'Colecciones';
        break;
      case 'favoritosMenu':
        this.section = 'Favoritos';
        break;

    }

  }

}
