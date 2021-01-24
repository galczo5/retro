import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopLeftLogoComponent} from './top-left-logo/top-left-logo.component';
import {GithubLinkComponent} from './github-link/github-link.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [TopLeftLogoComponent, GithubLinkComponent],
  exports: [
    TopLeftLogoComponent,
    GithubLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BrandModule {
}
