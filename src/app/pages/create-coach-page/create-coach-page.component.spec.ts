import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoachPageComponent } from './create-coach-page.component';

describe('CreateCoachPageComponent', () => {
  let component: CreateCoachPageComponent;
  let fixture: ComponentFixture<CreateCoachPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCoachPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCoachPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
