import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingUsersComponent } from './trending.users.component';

describe('TrendingUsersComponent', () => {
  let component: TrendingUsersComponent;
  let fixture: ComponentFixture<TrendingUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
