import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    PlayerComponent,
    QueueComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlayerComponent,
    QueueComponent
  ]
})
export class PlayerModule { }
