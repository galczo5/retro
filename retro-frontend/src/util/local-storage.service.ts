import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    constructor() {
    }

    getValue<T>(key: string, defaultValue: any = {}): T {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue;
    }

    setValue(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
