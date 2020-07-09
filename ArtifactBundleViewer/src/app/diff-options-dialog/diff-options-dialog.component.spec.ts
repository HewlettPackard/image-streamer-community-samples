import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffOptionsDialogComponent } from './diff-options-dialog.component';

describe('DiffOptionsDialogComponent', () => {
  let component: DiffOptionsDialogComponent;
  let fixture: ComponentFixture<DiffOptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffOptionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
