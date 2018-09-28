import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryCreateComponent } from './factory-create.component';

describe('FactoryCreateComponent', () => {
  let component: FactoryCreateComponent;
  let fixture: ComponentFixture<FactoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
