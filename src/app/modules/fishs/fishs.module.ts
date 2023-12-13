import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishComponent } from './components/fish/fish.component';
import { AppModule } from '../../app.module';
import { AddFishComponent } from './components/add-fish/add-fish.component';



@NgModule({
  declarations: [
    
  
    AddFishComponent
  ],
  imports: [
    CommonModule,
    AppModule
  ]
})
export class FishsModule { }
