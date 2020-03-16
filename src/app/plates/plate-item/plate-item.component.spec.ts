import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateItemComponent } from './plate-item.component';

describe('PlateItemComponent', () => {
  let component: PlateItemComponent;
  let fixture: ComponentFixture<PlateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
