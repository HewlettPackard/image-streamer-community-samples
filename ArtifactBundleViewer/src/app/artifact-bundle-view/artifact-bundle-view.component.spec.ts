import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactBundleViewComponent } from './artifact-bundle-view.component';

describe('ArtifactBundleViewComponent', () => {
  let component: ArtifactBundleViewComponent;
  let fixture: ComponentFixture<ArtifactBundleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactBundleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactBundleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
