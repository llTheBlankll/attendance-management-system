import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SectionRankingCardComponent} from './section-ranking-card.component';

describe('SectionRankingCardComponent', () => {
  let component: SectionRankingCardComponent;
  let fixture: ComponentFixture<SectionRankingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionRankingCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionRankingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
