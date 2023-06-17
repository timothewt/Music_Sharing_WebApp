import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSongCardComponent } from './upload-song-card.component';

describe('UploadSongCardComponent', () => {
  let component: UploadSongCardComponent;
  let fixture: ComponentFixture<UploadSongCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadSongCardComponent]
    });
    fixture = TestBed.createComponent(UploadSongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
