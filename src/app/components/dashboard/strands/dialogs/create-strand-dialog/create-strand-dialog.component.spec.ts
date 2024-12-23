import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStrandDialogComponent } from './create-strand-dialog.component';

describe('CreateStrandDialogComponent', () => {
  let component: CreateStrandDialogComponent;
  let fixture: ComponentFixture<CreateStrandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStrandDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
