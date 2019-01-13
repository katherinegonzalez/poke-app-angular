import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeAddToCollectionComponent } from './poke-add-to-collection.component';

describe('PokeAddToCollectionComponent', () => {
  let component: PokeAddToCollectionComponent;
  let fixture: ComponentFixture<PokeAddToCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeAddToCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeAddToCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
