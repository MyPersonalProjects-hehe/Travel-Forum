import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkHeartComponent } from './bookmark.heart.component';

describe('BookmarkHeartComponent', () => {
  let component: BookmarkHeartComponent;
  let fixture: ComponentFixture<BookmarkHeartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkHeartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
