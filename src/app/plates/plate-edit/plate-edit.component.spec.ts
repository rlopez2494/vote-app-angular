import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateEditComponent } from './plate-edit.component';

describe('PlateEditComponent', () => {
  let component: PlateEditComponent;
  let fixture: ComponentFixture<PlateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
