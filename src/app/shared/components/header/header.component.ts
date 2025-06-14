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
  dropdownOpen = false;
  languages = [
    { code: 'ES', label: 'Español', flag: 'assets/images/es-flag.png'},
    { code: 'EN', label: 'English', flag: 'assets/images/en-flag.png'},
    { code: 'FR', label: 'Français', flag: 'assets/images/fr-flag.png'},
    { code: 'DE', label: 'Deutsch', flag: 'assets/images/de-flag.png'}
  ];
  selectedLang!: { code: string; label: string; flag: string };

  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {
    const savedCode = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const defaultLanguage = 'en';

    const langCode = savedCode || browserLang || defaultLanguage;
    const foundLang = this.languages.find(l => l.code.toLowerCase() === langCode.toLowerCase());

    this.selectedLang = foundLang ?? this.languages.find(l => l.code.toLowerCase() === defaultLanguage)!;

    this.translate.use(this.selectedLang.code.toLowerCase());
  }

  public changeLanguage(langCode: string) {
    const selected = this.languages.find(l => l.code.toLowerCase() === langCode.toLowerCase());
    if (selected) {
      this.selectedLang = selected;
      this.translate.use(selected.code.toLowerCase());
      localStorage.setItem('lang', selected.code.toLowerCase());
      setTimeout(() => {
        this.dropdownOpen = false;
      }, 10);
    }
  }

  public toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public logOut() {
    this.authService.logout();
  }
}
