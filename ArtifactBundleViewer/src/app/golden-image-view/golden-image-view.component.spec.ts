import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenImageViewComponent } from './golden-image-view.component';

describe('GoldenImageViewComponent', () => {
  let component: GoldenImageViewComponent;
  let fixture: ComponentFixture<GoldenImageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldenImageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
