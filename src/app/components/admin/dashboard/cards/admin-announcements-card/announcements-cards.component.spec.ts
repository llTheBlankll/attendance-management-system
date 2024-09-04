import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnouncementsCardsComponent} from './announcements-cards.component';

describe('AdminAnnouncementsCardComponent', () => {
  let component: AnnouncementsCardsComponent;
  let fixture: ComponentFixture<AnnouncementsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsCardsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
