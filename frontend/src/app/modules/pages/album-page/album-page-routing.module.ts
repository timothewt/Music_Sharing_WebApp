import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumPageComponent } from './components/album-page/album-page.component';

const routes: Routes = [
    { path: 'album/:id', component: AlbumPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AlbumPageRoutingModule {}