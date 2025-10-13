import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlStripComponent } from './control-strip.component';

describe('ControlStripComponent', () => {
  let component: ControlStripComponent;
  let fixture: ComponentFixture<ControlStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlStripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
