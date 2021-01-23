import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopLeftLogoComponent } from './top-left-logo/top-left-logo.component';
import { GithubLinkComponent } from './github-link/github-link.component';



@NgModule({
  declarations: [TopLeftLogoComponent, GithubLinkComponent],
  exports: [
    TopLeftLogoComponent,
    GithubLinkComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BrandModule { }
