import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrandsComponent } from './strands.component';

describe('StrandsComponent', () => {
  let component: StrandsComponent;
  let fixture: ComponentFixture<StrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
