import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectVehiclePage } from './select-vehicle.page';

describe('SelectVehiclePage', () => {
  let component: SelectVehiclePage;
  let fixture: ComponentFixture<SelectVehiclePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
