import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongPageComponent } from './components/song-page/song-page.component';


const routes: Routes = [
    { path: 'song/:id', component: SongPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SongPageRoutingModule {}