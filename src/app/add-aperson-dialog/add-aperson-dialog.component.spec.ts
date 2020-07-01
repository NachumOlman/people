import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAPersonDialogComponent } from './add-aperson-dialog.component';

describe('AddAPersonDialogComponent', () => {
  let component: AddAPersonDialogComponent;
  let fixture: ComponentFixture<AddAPersonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAPersonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAPersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
