import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateEditBodyComponent } from './plate-edit-body.component';

describe('PlateEditBodyComponent', () => {
  let component: PlateEditBodyComponent;
  let fixture: ComponentFixture<PlateEditBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateEditBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateEditBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
