import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokeListComponent } from './containers/poke-list/poke-list.component';
import { routes } from './routes.poke';
import { PokeDetailComponent } from './containers/poke-detail/poke-detail.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { PokeAddToCollectionComponent } from './components/poke-add-to-collection/poke-add-to-collection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PokeListComponent, PokeDetailComponent, PokeCardComponent, PokeAddToCollectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class PokeMainModule { }
