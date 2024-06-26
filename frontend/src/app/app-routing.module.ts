import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/pages/home-page/home-page.module').then(m => m.HomePageModule)},
  { path: 'search', loadChildren: () => import('./modules/pages/search-page/search-page.module').then(m => m.SearchPageModule)},
  { path: 'artist', loadChildren: () => import('./modules/pages/artist-page/artist-page.module').then(m => m.ArtistPageModule)},
  { path: 'song', loadChildren: () => import('./modules/pages/song-page/song-page.module').then(m => m.SongPageModule)},
  { path: 'album', loadChildren: () => import('./modules/pages/album-page/album-page.module').then(m => m.AlbumPageModule)},
  { path: 'login', loadChildren: () => import('./modules/pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  { path: 'upload', loadChildren: () => import('./modules/pages/upload/upload-page.module').then(m => m.UploadPageModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
