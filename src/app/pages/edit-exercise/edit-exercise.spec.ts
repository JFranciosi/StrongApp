import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExercise } from './edit-exercise';

describe('EditExercise', () => {
  let component: EditExercise;
  let fixture: ComponentFixture<EditExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
