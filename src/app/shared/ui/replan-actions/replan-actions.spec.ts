import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplanActions } from './replan-actions';

describe('ReplanActions', () => {
  let component: ReplanActions;
  let fixture: ComponentFixture<ReplanActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplanActions],
    }).compileComponents();

    fixture = TestBed.createComponent(ReplanActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
