import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentPlanViewComponent } from './deployment-plan-view.component';

describe('DeploymentPlanViewComponent', () => {
  let component: DeploymentPlanViewComponent;
  let fixture: ComponentFixture<DeploymentPlanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentPlanViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
