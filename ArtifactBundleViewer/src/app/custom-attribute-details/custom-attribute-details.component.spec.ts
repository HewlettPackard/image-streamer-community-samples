import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAttributeDetailsComponent } from './custom-attribute-details.component';

describe('CustomAttributeDetailsComponent', () => {
  let component: CustomAttributeDetailsComponent;
  let fixture: ComponentFixture<CustomAttributeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAttributeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAttributeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
