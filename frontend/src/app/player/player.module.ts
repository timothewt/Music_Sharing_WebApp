import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    PlayerComponent,
    QueueComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    PlayerComponent,
    QueueComponent
  ]
})
export class PlayerModule { }
