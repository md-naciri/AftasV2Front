import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionsComponent } from './competition.component';


describe('CompetitionComponent', () => {
  let component: CompetitionsComponent;
  let fixture: ComponentFixture<CompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
