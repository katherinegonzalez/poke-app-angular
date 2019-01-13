import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCreateComponent } from './components/collection-create/collection-create.component';
import { CollectionListComponent } from './containers/collection-list/collection-list.component';
import { CollectionDetailComponent } from './containers/collection-detail/collection-detail.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes.collections';

@NgModule({
  declarations: [CollectionCreateComponent, CollectionListComponent, CollectionDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CollectionsModule { }
