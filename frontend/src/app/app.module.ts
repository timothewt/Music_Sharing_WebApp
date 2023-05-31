import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QueueComponent } from './player/queue/queue.component';
import { APIService } from "./services/api.service";
import { ArrowsNavComponent } from './components/arrows-nav/arrows-nav.component';

import { UtilityModule } from './utility/utility.module';
import { ArtistPageRoutingModule } from './artist-page/artist-page-routing.module';
import { AlbumPageRoutingModule } from './album-page/album-page-routing.module';
import { SongPageRoutingModule } from './song-page/song-page-routing.module';
import { PlayerModule } from './player/player.module';
import { HomePageRoutingModule } from './home-page/home-page-routing.module';
import { SearchPageRoutingModule } from './search-page/search-page-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArrowsNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UtilityModule,
    AlbumPageRoutingModule,
    SongPageRoutingModule,
    ArtistPageRoutingModule,
    SearchPageRoutingModule,
    HomePageRoutingModule,
    PlayerModule,
  ],
  providers: [APIService,],
  bootstrap: [AppComponent]
})
export class AppModule {

}
