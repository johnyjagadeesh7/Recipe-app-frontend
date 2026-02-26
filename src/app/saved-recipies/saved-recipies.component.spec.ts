import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipiesComponent } from './saved-recipies.component';

describe('SavedRecipiesComponent', () => {
  let component: SavedRecipiesComponent;
  let fixture: ComponentFixture<SavedRecipiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedRecipiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedRecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
