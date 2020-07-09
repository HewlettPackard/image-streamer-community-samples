import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAttributeListComponent } from './custom-attribute-list.component';

describe('CustomAttributeListComponent', () => {
  let component: CustomAttributeListComponent;
  let fixture: ComponentFixture<CustomAttributeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAttributeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAttributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
