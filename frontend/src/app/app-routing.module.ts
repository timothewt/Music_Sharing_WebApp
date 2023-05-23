import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { SongPageComponent } from './pages/song-page/song-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: 'artist/:id', component: ArtistPageComponent },
  { path: 'song/:id', component: SongPageComponent },
  { path: 'album/:id', component: AlbumPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
