import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page/home-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: 'artist', loadChildren: () => import('./artist-page/artist-page.module').then(m => m.ArtistPageModule)},
  { path: 'song', loadChildren: () => import('./song-page/song-page.module').then(m => m.SongPageModule) },
  { path: 'album', loadChildren: () => import('./album-page/album-page.module').then(m => m.AlbumPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
