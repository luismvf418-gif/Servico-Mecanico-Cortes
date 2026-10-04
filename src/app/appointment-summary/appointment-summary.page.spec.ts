import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentSummaryPage } from './appointment-summary.page';

describe('AppointmentSummaryPage', () => {
  let component: AppointmentSummaryPage;
  let fixture: ComponentFixture<AppointmentSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
