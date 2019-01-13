import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePokeCardComponent } from './favorite-poke-card.component';

describe('FavoritePokeCardComponent', () => {
  let component: FavoritePokeCardComponent;
  let fixture: ComponentFixture<FavoritePokeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePokeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePokeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
