import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoByteComponent } from './info.byte.component';

describe('InfoByteComponent', () => {
  let component: InfoByteComponent;
  let fixture: ComponentFixture<InfoByteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoByteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoByteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
