import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganoComponent } from './organo.component';

describe('OrganoComponent', () => {
  let component: OrganoComponent;
  let fixture: ComponentFixture<OrganoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
