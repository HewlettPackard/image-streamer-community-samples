import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPlanViewComponent } from './build-plan-view.component';

describe('BuildPlanViewComponent', () => {
  let component: BuildPlanViewComponent;
  let fixture: ComponentFixture<BuildPlanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildPlanViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
