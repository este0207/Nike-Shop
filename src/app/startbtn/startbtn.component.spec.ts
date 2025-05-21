import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartbtnComponent } from './startbtn.component';

describe('StartbtnComponent', () => {
  let component: StartbtnComponent;
  let fixture: ComponentFixture<StartbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartbtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
