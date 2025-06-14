import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatOption } from '@angular/material/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    RouterModule,
    MatFormFieldModule,
    TranslateModule,
    MatSelectModule,
    MatOption 
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  selectedLang: string = 'en';
  languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' }
  ];

  constructor (
    private translate: TranslateService,
    private authService: AuthService
  ) {
    const savedLang = localStorage.getItem('lang');
    const defaultLang = savedLang || translate.getBrowserLang() || 'en';
    this.selectedLang = this.languages.some(l => l.code === defaultLang) ? defaultLang : 'en';
    this.translate.use(this.selectedLang);
  }

  changeLanguage(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }


  public logOut() {
    this.authService.logout();
  }
}
