import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListOfTeachersComponent} from './list-of-teachers.component';

describe('ListOfTeachersComponent', () => {
  let component: ListOfTeachersComponent;
  let fixture: ComponentFixture<ListOfTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfTeachersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListOfTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
