import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { APIService } from "./services/api.service";
import { ArrowsNavComponent } from './components/arrows-nav/arrows-nav.component';

import { UtilityModule } from './modules/utility/utility.module';
import { ArtistPageRoutingModule } from './modules/pages/artist-page/artist-page-routing.module';
import { AlbumPageRoutingModule } from './modules/pages/album-page/album-page-routing.module';
import { SongPageRoutingModule } from './modules/pages/song-page/song-page-routing.module';
import { PlayerModule } from './modules/player/player.module';
import { HomePageRoutingModule } from './modules/pages/home-page/home-page-routing.module';
import { SearchPageRoutingModule } from './modules/pages/search-page/search-page-routing.module';
import { LoginPageRoutingModule } from './modules/pages/login-page/login-page-routing.module';
import { UploadPageRoutingModule } from './modules/pages/upload/upload-page-routing.module';
import { InfoLoginComponent } from './components/info-login/info-login.component';
import { OverlayHeaderComponent } from './components/overlay-header/overlay-header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArrowsNavComponent,
    InfoLoginComponent,
    OverlayHeaderComponent,
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
    LoginPageRoutingModule,
    UploadPageRoutingModule,
  ],
  providers: [APIService,],
  bootstrap: [AppComponent]
})
export class AppModule {

}
