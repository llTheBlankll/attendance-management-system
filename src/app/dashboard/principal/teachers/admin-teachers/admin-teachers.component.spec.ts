import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeachersComponent } from './admin-teachers.component';

describe('AdminTeachersComponent', () => {
  let component: AdminTeachersComponent;
  let fixture: ComponentFixture<AdminTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTeachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
