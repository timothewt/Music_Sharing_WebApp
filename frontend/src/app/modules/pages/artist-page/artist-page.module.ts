import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistPageComponent } from './components/artist-page/artist-page.component';
import { UtilityModule } from 'src/app/modules/utility/utility.module';


@NgModule({
  declarations: [
    ArtistPageComponent,
  ],
  imports: [
    CommonModule,
    UtilityModule,
  ],
  exports: [
    ArtistPageComponent
  ]
})
export class ArtistPageModule { }
