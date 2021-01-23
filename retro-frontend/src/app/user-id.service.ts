import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {

  public static readonly KEY: string = 'retro-app-user-id';

  constructor() {}

  getUserId(): string {

    const item = localStorage.getItem(UserIdService.KEY);
    if (!item) {
      const hash = this.getUUID();
      localStorage.setItem(UserIdService.KEY, hash)
    }

    const result = localStorage.getItem(UserIdService.KEY);
    document.cookie = 'User-Id=' + result;
    return result;
  }

  private getUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
