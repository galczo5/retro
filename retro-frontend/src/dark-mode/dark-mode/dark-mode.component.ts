import { Component, OnInit } from '@angular/core';
import {DarkModeService} from '../dark-mode.service';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html'
})
export class DarkModeComponent implements OnInit {

  dark: boolean = false;

  size: number = 26;

  constructor(private readonly darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.dark = this.darkModeService.get();
  }

  toggle(): void {
    this.dark = !this.dark;
    this.darkModeService.set(this.dark);
  }

}
