import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesAddToCollectionComponent } from './favorites-add-to-collection.component';

describe('FavoritesAddToCollectionComponent', () => {
  let component: FavoritesAddToCollectionComponent;
  let fixture: ComponentFixture<FavoritesAddToCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesAddToCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesAddToCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
