import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementDialogComponent } from './create-announcement-dialog.component';

describe('CreateAnnouncementDialogComponent', () => {
  let component: CreateAnnouncementDialogComponent;
  let fixture: ComponentFixture<CreateAnnouncementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnnouncementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnnouncementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
