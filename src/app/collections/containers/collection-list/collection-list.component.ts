import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CollectionsService } from '../../services/collections.service';
import { Collection } from '../../models/collections';
import { MessagesService} from 'src/app/alerts/services/messages.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit, OnDestroy {

  closeResult: string;
  collections: any[];

  selectedCollection: string;
  private subscriptionListCollections: any;
  private subscriptionGetCollectionByName: any;

  constructor(
    private modalService: NgbModal,
    private collectionsService: CollectionsService,
    private alertMessage: MessagesService,
    private router: Router) { }

  ngOnInit() {
    window.addEventListener('change', this.searchCollection.bind(this));
    this.getAllCollections();
  }

  ngOnDestroy() {

    if (this.subscriptionListCollections !== undefined && this.subscriptionListCollections !== null) {
      this.subscriptionListCollections.unsubscribe();
    }
    if (this.subscriptionGetCollectionByName !== undefined && this.subscriptionGetCollectionByName !== null) {
      this.subscriptionGetCollectionByName.unsubscribe();
    }
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

  closeModal (event) {
    if (event) {
      this.modalService.dismissAll();
    }
  }

  getAllCollections() {
    this.subscriptionListCollections  = this.collectionsService.listCollections().subscribe(
      collections => {
        this.collections = collections;
      }
    );
  }

  editSelectedCollection(collection: any, content: any) {
    this.selectedCollection = collection;
    this.modalService.open(content);
  }

  deleteSelectedCollection(collecion: any) {
    this.collectionsService.removeCollection(collecion.key).
      then(_ => {
        this.alertMessage.message({msg: 'La colección ' + collecion.data.nameCollection + ' ha sido eliminada exitosamente',
          type: 'success'});
      }, (error) => {
        this.alertMessage.message({msg: 'No fue posible eliminar la colección ' + collecion.data.nameCollection , type: 'error'});
      });
  }

  searchCollection(event) {
    if (this.router.url.includes('collections')) {
      if (event.target.id === 'searchPokemon') {
        if (event.srcElement.value === '' || event.srcElement.value === null || event.srcElement.value === undefined) {
          this.getAllCollections();
        } else {
          this.getCollection(event.srcElement.value);
        }
      }
    }
  }

  getCollection(name) {
    this.subscriptionGetCollectionByName = this.collectionsService.searchCollectionByName(name).subscribe(
      collections => {
        this.collections = collections;
      }
    );
  }
}
