import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassCreateDialogComponent} from './class-create-dialog.component';

describe('ClassCreateDialogComponent', () => {
  let component: ClassCreateDialogComponent;
  let fixture: ComponentFixture<ClassCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassCreateDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
