import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarDialogComponent } from './top-bar-dialog.component';

describe('TopBarDialogComponent', () => {
  let component: TopBarDialogComponent;
  let fixture: ComponentFixture<TopBarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBarDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
