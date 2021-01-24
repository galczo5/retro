import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {

  public static readonly KEY: string = 'retro-app-user-id';

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
  }

  getUserId(): string {

    const item = localStorage.getItem(UserIdService.KEY);
    if (!item) {
      const hash = this.getUUID();
      localStorage.setItem(UserIdService.KEY, hash);
    }

    const result = localStorage.getItem(UserIdService.KEY);
    this.document.cookie = 'User-Id=' + result;
    return result;
  }

  private getUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0;
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
