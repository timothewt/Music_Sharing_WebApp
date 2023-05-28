import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QueueComponent } from './components/queue/queue.component';
import { APIService } from "./services/api.service";
import { ArrowsNavComponent } from './components/arrows-nav/arrows-nav.component';

import { UtilityModule } from './utility/utility.module';
import { ArtistPageModule } from './artist-page/artist-page.module';
import { AlbumPageRoutingModule } from './album-page/album-page-routing.module';
import { SongPageRoutingModule } from './song-page/song-page-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NavbarComponent,
    QueueComponent,
    ArrowsNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ArtistPageModule,
    UtilityModule,
    AlbumPageRoutingModule,
    SongPageRoutingModule,
  ],
  providers: [APIService,],
  bootstrap: [AppComponent]
})
export class AppModule {

}
