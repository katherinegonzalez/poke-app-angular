import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCreateComponent } from './components/collection-create/collection-create.component';
import { CollectionListComponent } from './containers/collection-list/collection-list.component';
import { CollectionDetailComponent } from './containers/collection-detail/collection-detail.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes.collections';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollectionDetailListCardComponent } from './components/collection-detail-list-card/collection-detail-list-card.component';


@NgModule({
  declarations: [CollectionCreateComponent, CollectionListComponent, CollectionDetailComponent, CollectionDetailListCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class CollectionsModule { }
