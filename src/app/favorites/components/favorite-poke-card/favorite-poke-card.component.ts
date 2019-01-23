import { Component, OnInit, Input } from '@angular/core';
import {PokeListService} from '../../../poke-main/services/poke-list.service';
import { IPokemon } from '../../../poke-main/models/interfaces/pokemon';
import { MessagesService } from 'src/app/alerts/services/messages.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-favorite-poke-card',
  templateUrl: './favorite-poke-card.component.html',
  styleUrls: ['./favorite-poke-card.component.css']
})

export class FavoritePokeCardComponent implements OnInit {

  _pokeResult: IPokemon;
  _poke: any;
  closeResult: string;

  @Input()
  get poke(): any {
    return this._poke;
  }
  set poke(result: any) {
    this._poke = result;
  }

  constructor(
    private modalService: NgbModal,
    private pokeService: PokeListService,
    private alertMessage: MessagesService) { }

  ngOnInit() {
  }

  removeFavorite(pokemon) {
    this.pokeService.removeFavorite(pokemon.key, pokemon.data.name)
    .then(_ => {
      this.alertMessage.message({msg: 'Has quitado a ' + pokemon.data.name + ' de favoritos', type: 'success'});
    }, (error) => {
      this.alertMessage.message({msg: 'No fue posible quitar a ' + pokemon.data.name + ' de favoritos', type: 'error'});
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'model-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with ${result}`;
    }, (reason) => {
      this.closeResult = `Dismossed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
