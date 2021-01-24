import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { SessionModule } from '../session/session.module';
import { SessionHashService } from '../session/session-hash.service';
import { EditorRoleService } from './editor-role.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SessionHttpService } from './session-http.service';
import { CardsVisibleService } from './cards-visible.service';

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

@Injectable({ providedIn: 'root' })
export class EditorRoleGuard implements CanActivate {

  constructor(private readonly editorRoleService: EditorRoleService,
              private readonly sessionHashService: SessionHashService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.sessionHashService.getHash()
      .pipe(
        map(hash => {
          const token = localStorage.getItem(hash);
          this.editorRoleService.setToken(token);
          return true;
        })
      );
  }

}

@Injectable({ providedIn: 'root' })
export class CardsVisibleGuard implements CanActivate {

  constructor(private readonly httpService: SessionHttpService,
              private readonly cardsVisibleService: CardsVisibleService,
              private readonly sessionHashService: SessionHashService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.sessionHashService.getHash()
      .pipe(
        switchMap(hash => this.httpService.cardsVisible(hash)),
        map(cardsVisible => {
          this.cardsVisibleService.setCardsVisible(cardsVisible);
          return true;
        })
      );
  }

}

const routes: Routes = [
  { path: '', loadChildren: () => HomeModule },
  { path: 'session/:id', loadChildren: () => SessionModule, canActivate: [ SessionHashGuard, EditorRoleGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
