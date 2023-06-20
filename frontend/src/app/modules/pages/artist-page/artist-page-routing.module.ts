import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistPageComponent } from './components/artist-page/artist-page.component';


const routes: Routes = [
    { path: 'artist/:id', component: ArtistPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArtistPageRoutingModule {}