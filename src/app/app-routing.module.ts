import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './errors/components/notfound/notfound.component';
import { CompetitionsComponent } from './modules/competition/components/competition/competition.component';
import { LevelComponent } from './modules/level/components/level/level.component';
import { FishComponent } from './modules/fishs/components/fish/fish.component';
import { MemberComponent } from './modules/members/components/member/member.component';
import { HuntingComponent } from './modules/hunting/components/hunting/hunting.component';
import { NotauthorizeComponent } from './errors/components/notauthorize/notauthorize.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
  {path: 'huntings', component: HuntingComponent},
  {path: 'members', component: MemberComponent},
  {path: 'fishes', component: FishComponent},
  {path: 'competitions' , component: CompetitionsComponent},
  {path: 'levels' , component: LevelComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},  
  {path:'403',component:NotauthorizeComponent},
  {path: '', redirectTo: '/competitions', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
