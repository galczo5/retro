import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DropDirective} from './drop.directive';

@Injectable({
  providedIn: 'root'
})
export class CardDragService {

  private hash: string;
  private readonly drag$: Subject<boolean> = new Subject<boolean>();
  private readonly dragEnter$: Subject<DropDirective> = new Subject<DropDirective>();

  setCardHash(hash: string): void {
    this.hash = hash;
  }

  getCardHash(): string {
    return this.hash;
  }

  setDrag(state: boolean): void {
    this.drag$.next(state);
  }

  onDrag(): Observable<boolean> {
    return this.drag$.asObservable();
  }

  setDragEnter(state: DropDirective): void {
    this.dragEnter$.next(state);
  }

  onDragEnter(): Observable<DropDirective> {
    return this.dragEnter$.asObservable();
  }

}
