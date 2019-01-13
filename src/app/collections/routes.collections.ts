import { Routes } from '@angular/router';
import { CollectionListComponent } from './containers/collection-list/collection-list.component';
import { CollectionDetailComponent } from './containers/collection-detail/collection-detail.component';

export const routes: Routes = [
    {
        path: 'list',
        component: CollectionListComponent
    },
    {
      path: 'collection/:key',
      component: CollectionDetailComponent
    },
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    }
];
