import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PokeListService } from '../../../poke-main/services/poke-list.service';
import { IPokeList } from '../../../poke-main/models/interfaces/poke-list';
import { IPokemon } from '../../../poke-main/models/interfaces/pokemon';
import { Collection } from '../../models/collections';
import { CollectionsService } from '../../services/collections.service';
import { MessagesService } from 'src/app/alerts/services/messages.service';

@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.css']
})
export class CollectionCreateComponent implements OnInit {

  pokeList: IPokeList;
  pokemons: IPokemon[];
  collections: Collection[] = [];

  collectionForm = this.formBuilder.group({
    nameCollection: ['', Validators.required],
    descriptionCollection: ['', Validators],
    pokemonsCollection: ['', Validators.required]
  });

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private pokeListService: PokeListService,
    private collecionsService: CollectionsService,
    private alertMessage: MessagesService) { }

  ngOnInit() {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokeListService.list().subscribe(
      pokemons => {
        if (pokemons) {
          this.pokeList = pokemons;
          this.pokeList.results = pokemons.results.slice(0, 20);
          this.pokemons = this.pokeList.results;
        } else {
          this.pokemons = [];
        }
      }
    );
  }

  submit(event: Collection) {
    console.log(this.collectionForm.value);
    this.collecionsService.addCollection(this.collectionForm.value)
    .then(_ => {
      this.alertMessage.message({msg: 'La colección ' + this.collectionForm.value.nameCollection + ' ha sido creada exitosamente',
        type: 'success'});
      this.closeModal.emit(true);
    }, (error) => {
      this.alertMessage.message({msg: 'No fue posible crear la colección ' + this.collectionForm.value.name, type: 'error'});
    });
  }

}
