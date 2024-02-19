import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotauthorizeComponent } from './components/notauthorize/notauthorize.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    NotauthorizeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorsModule { }
