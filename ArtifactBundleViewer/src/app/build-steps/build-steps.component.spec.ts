import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildStepsComponent } from './build-steps.component';

describe('BuildStepsComponent', () => {
  let component: BuildStepsComponent;
  let fixture: ComponentFixture<BuildStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
