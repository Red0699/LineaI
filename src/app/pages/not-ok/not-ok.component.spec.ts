import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotOkComponent } from './not-ok.component';

describe('NotOkComponent', () => {
  let component: NotOkComponent;
  let fixture: ComponentFixture<NotOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
