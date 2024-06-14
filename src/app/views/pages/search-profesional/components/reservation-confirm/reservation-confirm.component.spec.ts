import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationConfirmComponent } from './reservation-confirm.component';

describe('ReservationConfirmComponent', () => {
  let component: ReservationConfirmComponent;
  let fixture: ComponentFixture<ReservationConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
