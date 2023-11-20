import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelDialogComponent } from './del-dialog.component';

describe('DelDialogComponent', () => {
  let component: DelDialogComponent;
  let fixture: ComponentFixture<DelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
