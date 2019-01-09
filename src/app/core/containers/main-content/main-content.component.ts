import { Component, OnInit } from '@angular/core';
import { IMessage } from 'src/app/alerts/models/interfaces/message';
import {MessagesService} from 'src/app/alerts/services/messages.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor(private msgService: MessagesService) { }

  ngOnInit() {
    window.addEventListener('online', this.updateIndicator.bind(this)); // para que dentro del
                                                                        // contexto de la funciòn el this sea el mismo de la clase
    window.addEventListener('offline', this.updateIndicator.bind(this));
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

}
