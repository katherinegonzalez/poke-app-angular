import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {
  closeResult: string;
  constructor( private modalService: NgbModal) { }

  ngOnInit() {
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


}
