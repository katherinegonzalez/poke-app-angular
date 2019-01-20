import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { MessagesService } from 'src/app/alerts/services/messages.service';

@Component({
  selector: 'app-poke-add-to-collection',
  templateUrl: './poke-add-to-collection.component.html',
  styleUrls: ['./poke-add-to-collection.component.css']
})
export class PokeAddToCollectionComponent implements OnInit {

  addTocollectionForm = this.formBuilder.group({
    collectionVal: ['', Validators.required],
    namePokemon: ['', Validators]
  });

  @Output() closeModal = new EventEmitter<boolean>();
  @Input() selectedPokemon: any;

  pokemon: string;
  collections: any[];

  constructor(
    private formBuilder: FormBuilder,
    private collectionsService: CollectionsService,
    private alertMessage: MessagesService
  ) { }

  ngOnInit() {
    this.pokemon = this.selectedPokemon;
    this.addTocollectionForm.controls['namePokemon'].setValue(this.pokemon);

    this.getAllCollections();
  }

  getAllCollections() {
    this.collectionsService.listCollections().subscribe(
      collections => {

        this.collections = collections;
        this.addTocollectionForm.controls['collectionVal'].setValue(collections[0]);
      }
    );
  }

  submit(event: any) {
    this.addPokemonToCollection();
  }

  addPokemonToCollection() {
    console.log(this.addTocollectionForm.value);
    const valueCollection = this.addTocollectionForm.value;
    if (valueCollection.collectionVal.data.pokemonsCollection === '' ||
    valueCollection.collectionVal.data.pokemonsCollection === null ||
    valueCollection.collectionVal.data.pokemonsCollection === undefined) {
      valueCollection.collectionVal.data.pokemonsCollection = [];
    }
    valueCollection.collectionVal.data.pokemonsCollection.push(valueCollection.namePokemon);
    this.collectionsService.editCollection(
      valueCollection.collectionVal.key,
      valueCollection.collectionVal.data)
      .then(_ => {
        this.alertMessage.message({
          msg:  valueCollection.namePokemon + ' ha sido agregado a la colección' + valueCollection.collectionVal.data.nameCollection,
          type: 'success'});
        this.closeModal.emit(true);
      }, (error) => {
        this.alertMessage.message({msg: 'No fue posible agregar a ' + valueCollection.namePokemon + ' a la colección', type: 'error'});
      });
    /*this.collectionsService.addPokemonToCollection(
      valueCollection.collectionVal.key,
      valueCollection.namePokemon,
      valueCollection.collectionVal.data)
      .then(_ => {
        this.alertMessage.message({
          msg:  valueCollection.namePokemon + ' ha sido agregado a la colección' + valueCollection.collectionVal.data.nameCollection,
          type: 'success'});
        this.closeModal.emit(true);
      }, (error) => {
        this.alertMessage.message({msg: 'No fue posible agregar a ' + valueCollection.namePokemon + ' a la colección', type: 'error'});
      });*/


  }


}
