import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectFormComponent } from './new-project.component';

describe('NewProjectFormComponent', () => {
  let component: NewProjectFormComponent;
  let fixture: ComponentFixture<NewProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProjectFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
