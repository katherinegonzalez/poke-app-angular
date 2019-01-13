import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailListCardComponent } from './collection-detail-list-card.component';

describe('CollectionDetailListCardComponent', () => {
  let component: CollectionDetailListCardComponent;
  let fixture: ComponentFixture<CollectionDetailListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionDetailListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDetailListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
