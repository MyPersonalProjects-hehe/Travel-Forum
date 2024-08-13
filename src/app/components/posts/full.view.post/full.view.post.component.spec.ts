import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullViewPostComponent } from './full.view.post.component';

describe('FullViewPostComponent', () => {
  let component: FullViewPostComponent;
  let fixture: ComponentFixture<FullViewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullViewPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
