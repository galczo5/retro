import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { SessionModule } from '../session/session.module';
import { SessionHashService } from '../session/session-hash.service';

@Injectable({ providedIn: 'root' })
export class SessionHashGuard implements CanActivate {

  constructor(private readonly sessionHashService: SessionHashService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hash = route.paramMap.get('id');
    this.sessionHashService.setHash(hash);
    return true;
  }

}

const routes: Routes = [
  { path: '', loadChildren: () => HomeModule },
  { path: 'session/:id', loadChildren: () => SessionModule, canActivate: [ SessionHashGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
