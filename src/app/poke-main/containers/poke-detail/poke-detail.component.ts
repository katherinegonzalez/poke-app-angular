import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokeListService } from '../../services/poke-list.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/alerts/services/messages.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})

export class PokeDetailComponent implements OnInit, OnDestroy {

  constructor(
    private pokeListService: PokeListService,
    private router: Router,
    private modalService: NgbModal,
    private alertMessage: MessagesService,
    private authService: AuthService) { }

  pokemonName: string;
  _poke: any;
  _favorite: Boolean = false;
  key: string;

  closeResult: string;
  private subscription: any;
  private subscriptionPoke: any;

  ngOnInit() {

    this.pokemonName = this.router.url.split('/').pop(); // this.router.currentUrlTree.root.children.primary.segments[3].path;
    this.subscriptionPoke = this.pokeListService.getPokemon(this.pokemonName).subscribe(
      pokemon => {
        this._poke = pokemon;
        this.isFavorite(pokemon);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription !== undefined && this.subscription !== null) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionPoke !== undefined && this.subscriptionPoke !== null) {
      this.subscriptionPoke.unsubscribe();
    }
  }

  addFavorite(pokemon) {
    this.pokeListService.addFavorite(pokemon).
    then(_ => {
      this.alertMessage.message({msg: pokemon.name + ' ha sido agregado a favoritos', type: 'success'});
      this._poke.isFavorite = true;
    }, (error) => {
      this.alertMessage.message({msg: 'No fue posible quitar a ' + pokemon.name + ' de favoritos', type: 'error'});
    });
  }

  removeFavorite(pokemon) {
    this.pokeListService.removeFavorite(pokemon.key, pokemon.name)
    .then(_ => {
      this.alertMessage.message({msg: 'Has quitado a ' + pokemon.name + ' de favoritos', type: 'success'});
      this._poke.isFavorite = false;
    }, (error) => {
      this.alertMessage.message({msg: 'No fue posible quitar a ' + pokemon.name + ' de favoritos', type: 'error'});
    });
  }

  isFavorite(pokemon) {
    this.subscription = this.pokeListService.searchPokemonFavorite(pokemon).subscribe(
      poke => {
        if (poke.length > 0) {
            pokemon.isFavorite = true;
            pokemon.key = poke[0].key;
            this._favorite = true;
        } else {
            this._favorite = false;
            pokemon.isFavorite = false;
        }
        this._poke = pokemon;
      }
    );
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
