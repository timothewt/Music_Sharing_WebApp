import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArtistPageComponent } from './artist-page/components/artist-page/artist-page.component';
import { SongPageComponent } from './song-page/components/song-page/song-page.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { AlbumComponent } from './utility/components/album/album.component';
import { QueueComponent } from './components/queue/queue.component';
import { APIService } from "./services/api.service";
import { SongComponent } from './utility/components/song/song.component';
import { TimePipe } from './utility/timePipe';
import { ArrowsNavComponent } from './components/arrows-nav/arrows-nav.component';

import { AlbumPageModule } from './album-page/album-page.module';
import { UtilityModule } from './utility/utility.module';
import { SongPageModule } from './song-page/song-page.module';
import { ArtistPageModule } from './artist-page/artist-page.module';

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
    AlbumPageModule,
    SongPageModule,
    ArtistPageModule,
    UtilityModule,
  ],
  providers: [APIService,],
  bootstrap: [AppComponent]
})
export class AppModule {

}
