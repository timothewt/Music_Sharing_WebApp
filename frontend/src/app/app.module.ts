import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { SongPageComponent } from './pages/song-page/song-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlbumComponent } from './components/album/album.component';
import { QueueComponent } from './components/queue/queue.component';
import { APIService } from "./services/api.service";
import { SongComponent } from './components/song/song.component';
import { TimePipe } from './models/timePipe';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { ArrowsNavComponent } from './arrows-nav/arrows-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NavbarComponent,
    ArtistPageComponent,
    SongPageComponent,
    HomePageComponent,
    AlbumComponent,
    QueueComponent,
    SongComponent,
    TimePipe,
    AlbumPageComponent,
    ArrowsNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [APIService,],
  bootstrap: [AppComponent]
})
export class AppModule {

}
