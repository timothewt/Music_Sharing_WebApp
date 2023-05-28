import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongPageComponent } from './components/song-page/song-page.component';
import { RouterModule } from '@angular/router';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  declarations: [
    SongPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilityModule
  ],
  exports: [
    SongPageComponent
  ]
})
export class SongPageModule { }
