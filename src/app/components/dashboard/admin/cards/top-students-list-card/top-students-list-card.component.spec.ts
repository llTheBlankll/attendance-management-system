import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudentsListCardComponent } from './top-students-list-card.component';

describe('TopStudentsListCardComponent', () => {
  let component: TopStudentsListCardComponent;
  let fixture: ComponentFixture<TopStudentsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStudentsListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStudentsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
