import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPageComponent } from './components/upload-page/upload-page.component';
import { UploadSongCardComponent } from './components/upload-song-card/upload-song-card.component';
import { UploadPageRoutingModule } from './upload-page-routing.module';
import { UploadSongCardGeneratorComponent } from './components/upload-song-card-generator/upload-song-card-generator.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UploadPageComponent,
    UploadSongCardComponent,
    UploadSongCardGeneratorComponent
  ],
  imports: [
    CommonModule,
    UploadPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    UploadPageComponent
  ]
})
export class UploadPageModule { }
