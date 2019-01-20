import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
    descriptionCollection: [''],
    pokemonsCollection: ['']
  });

  @Output() closeModal = new EventEmitter<boolean>();
  @Input() typeForm: string;
  @Input() selectedCollection: any;

  collection: any;

  constructor(
    private formBuilder: FormBuilder,
    private pokeListService: PokeListService,
    private collecionsService: CollectionsService,
    private alertMessage: MessagesService) { }

  ngOnInit() {
    this.getAllPokemons();

    if (this.typeForm === 'edit') {
      if (this.selectedCollection) {
        this.collection = this.selectedCollection;
        this.collectionForm.controls['nameCollection'].setValue(this.collection.data.nameCollection);
        this.collectionForm.controls['descriptionCollection'].setValue(this.collection.data.descriptionCollection);
        this.collectionForm.controls['pokemonsCollection'].setValue(this.collection.data.pokemonsCollection);
      }
    }
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
    if (this.collectionForm.invalid) {
      alert('El nombre de la colección no puede estar vacío');
      return;
    } else {
      switch (this.typeForm) {
        case 'create':
          this.createCollection();
        break;
        case 'edit':
          this.editCollection();
        break;
      }
    }
  }

  createCollection() {
    this.collecionsService.addCollection(this.collectionForm.value)
      .then(_ => {
        this.alertMessage.message({msg: 'La colección ' + this.collectionForm.value.nameCollection + ' ha sido creada exitosamente',
          type: 'success'});
        this.closeModal.emit(true);
      }, (error) => {
        this.alertMessage.message({msg: 'No fue posible crear la colección ' + this.collectionForm.value.name, type: 'error'});
      });
  }

  editCollection() {
    console.log(this.collectionForm.value);
    this.collecionsService.editCollection(this.collection.key, this.collectionForm.value)
      .then(_ => {
        this.alertMessage.message({msg: 'La colección ' + this.collectionForm.value.nameCollection + ' ha sido editada exitosamente',
          type: 'success'});
        this.closeModal.emit(true);
      }, (error) => {
        this.alertMessage.message({msg: 'No fue posible editar la colección ' + this.collectionForm.value.name, type: 'error'});
      });
  }

}
