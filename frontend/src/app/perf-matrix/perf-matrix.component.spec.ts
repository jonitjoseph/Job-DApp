import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfMatrixComponent } from './perf-matrix.component';

describe('PerfMatrixComponent', () => {
  let component: PerfMatrixComponent;
  let fixture: ComponentFixture<PerfMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
