import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateDetailsComponent } from './plate-details.component';

describe('PlateDetailsComponent', () => {
  let component: PlateDetailsComponent;
  let fixture: ComponentFixture<PlateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
