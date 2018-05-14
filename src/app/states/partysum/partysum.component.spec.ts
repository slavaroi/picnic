import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartysumComponent } from './partysum.component';

describe('PartysumComponent', () => {
  let component: PartysumComponent;
  let fixture: ComponentFixture<PartysumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartysumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartysumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
