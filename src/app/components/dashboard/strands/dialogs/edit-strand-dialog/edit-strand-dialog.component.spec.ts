import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStrandDialogComponent } from './edit-strand-dialog.component';

describe('EditStrandDialogComponent', () => {
  let component: EditStrandDialogComponent;
  let fixture: ComponentFixture<EditStrandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStrandDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
