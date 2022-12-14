import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { LanguageModule } from '../language/index';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, LanguageModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {
  static forRoot(): ModuleWithProviders<HeaderModule> {
    return {
      ngModule: HeaderModule,
    };
  }
}
