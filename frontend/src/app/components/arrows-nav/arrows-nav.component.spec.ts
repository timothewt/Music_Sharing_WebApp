import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowsNavComponent } from './arrows-nav.component';

describe('ArrowsNavComponent', () => {
  let component: ArrowsNavComponent;
  let fixture: ComponentFixture<ArrowsNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrowsNavComponent]
    });
    fixture = TestBed.createComponent(ArrowsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
