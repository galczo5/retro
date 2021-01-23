import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { SessionModule } from '../session/session.module';

const routes: Routes = [
  { path: '', loadChildren: () => HomeModule },
  { path: 'session/:id', loadChildren: () => SessionModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
