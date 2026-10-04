import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsListPage } from './appointments-list.page';

describe('AppointmentsListPage', () => {
  let component: AppointmentsListPage;
  let fixture: ComponentFixture<AppointmentsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
