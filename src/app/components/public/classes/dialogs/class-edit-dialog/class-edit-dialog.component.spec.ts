import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassEditDialogComponent} from './class-edit-dialog.component';

describe('ClassEditDialogComponent', () => {
  let component: ClassEditDialogComponent;
  let fixture: ComponentFixture<ClassEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassEditDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
