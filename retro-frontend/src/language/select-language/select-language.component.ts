import { Component, OnInit } from '@angular/core';
import {LanguageService} from '../language.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})
export class SelectLanguageComponent implements OnInit {

  selectedLanguage: string;

  constructor(
    private readonly languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.get();
  }

  selectLanguage(lang: string): void {
    this.languageService.set(lang);
  }

}
