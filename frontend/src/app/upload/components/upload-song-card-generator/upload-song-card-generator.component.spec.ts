import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSongCardGeneratorComponent } from './upload-song-card-generator.component';

describe('UploadSongCardGeneratorComponent', () => {
  let component: UploadSongCardGeneratorComponent;
  let fixture: ComponentFixture<UploadSongCardGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadSongCardGeneratorComponent]
    });
    fixture = TestBed.createComponent(UploadSongCardGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
