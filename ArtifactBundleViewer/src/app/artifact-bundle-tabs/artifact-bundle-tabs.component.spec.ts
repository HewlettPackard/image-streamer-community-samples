import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactBundleTabsComponent } from './artifact-bundle-tabs.component';

describe('ArtifactBundleTabsComponent', () => {
  let component: ArtifactBundleTabsComponent;
  let fixture: ComponentFixture<ArtifactBundleTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactBundleTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactBundleTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
