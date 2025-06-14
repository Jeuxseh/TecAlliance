import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private translate: TranslateService){
    const defaultLanguage = this.translate.getBrowserLang() || 'en';
    this.translate.use(defaultLanguage);
    localStorage.setItem('lang', defaultLanguage);
  }
  title = 'TecAllianceFrontend';
}
