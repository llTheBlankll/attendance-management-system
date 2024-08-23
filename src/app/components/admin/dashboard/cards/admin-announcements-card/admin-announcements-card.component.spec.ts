import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAnnouncementsCardComponent} from './admin-announcements-card.component';

describe('AdminAnnouncementsCardComponent', () => {
  let component: AdminAnnouncementsCardComponent;
  let fixture: ComponentFixture<AdminAnnouncementsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnnouncementsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminAnnouncementsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
