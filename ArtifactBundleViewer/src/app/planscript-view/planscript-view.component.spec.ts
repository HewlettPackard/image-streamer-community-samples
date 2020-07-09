import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanscriptViewComponent } from './planscript-view.component';

describe('PlanscriptViewComponent', () => {
  let component: PlanscriptViewComponent;
  let fixture: ComponentFixture<PlanscriptViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanscriptViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanscriptViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
