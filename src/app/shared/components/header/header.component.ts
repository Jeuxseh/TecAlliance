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
    { code: 'es', label: 'Español', flag: 'assets/images/es-flag.png'},
    { code: 'en', label: 'English', flag: 'assets/images/en-flag.png'},
    { code: 'fr', label: 'Français', flag: 'assets/images/fr-flag.png'},
    { code: 'de', label: 'Deutsch', flag: 'assets/images/de-flag.png'}
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
    const foundLang = this.languages.find(l => l.code === langCode);

    this.selectedLang = foundLang ?? this.languages.find(l => l.code === defaultLanguage)!;

    this.translate.use(this.selectedLang.code);
  }

  changeLanguage(langCode: string) {
    const selected = this.languages.find(l => l.code === langCode);
    if (selected) {
      this.selectedLang = selected;
      this.translate.use(selected.code);
      localStorage.setItem('lang', selected.code);
      setTimeout(() => {
        this.dropdownOpen = false;
      }, 10);
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public logOut() {
    this.authService.logout();
  }
}
