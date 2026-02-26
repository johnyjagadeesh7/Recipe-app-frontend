import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipiesComponent } from './view-recipies.component';

describe('ViewRecipiesComponent', () => {
  let component: ViewRecipiesComponent;
  let fixture: ComponentFixture<ViewRecipiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecipiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
