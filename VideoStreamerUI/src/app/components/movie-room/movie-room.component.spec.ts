import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRoomComponent } from './movie-room.component';

describe('MovieRoomComponent', () => {
  let component: MovieRoomComponent;
  let fixture: ComponentFixture<MovieRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
