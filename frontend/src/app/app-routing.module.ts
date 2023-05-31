import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)},
  { path: 'search', loadChildren: () => import('./search-page/search-page.module').then(m => m.SearchPageModule)},
  { path: 'artist', loadChildren: () => import('./artist-page/artist-page.module').then(m => m.ArtistPageModule)},
  { path: 'song', loadChildren: () => import('./song-page/song-page.module').then(m => m.SongPageModule)},
  { path: 'album', loadChildren: () => import('./album-page/album-page.module').then(m => m.AlbumPageModule)},
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
