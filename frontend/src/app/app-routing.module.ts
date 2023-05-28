import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistPageComponent } from './artist-page/components/artist-page/artist-page.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: 'artist/:id', component: ArtistPageComponent },
  { path: 'song', loadChildren: () => import('./song-page/song-page.module').then(m => m.SongPageModule) },
  { path: 'album', loadChildren: () => import('./album-page/album-page.module').then(m => m.AlbumPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
