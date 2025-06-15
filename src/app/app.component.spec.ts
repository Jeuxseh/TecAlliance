import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { mock, instance, when, verify, reset, spy } from 'ts-mockito';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockTranslateService: TranslateService ;
  let translateService: TranslateService;


  beforeEach(async () => {
    localStorage.clear();
    mockTranslateService = mock(TranslateService);
    translateService = instance(mockTranslateService);
  });

  it('should create the app', () => {
    component = new AppComponent(translateService);
    expect(component).toBeTruthy();
  });

  it('should use saved language from localStorage if it exists', () => {
    localStorage.setItem('lang', 'fr');

    component = new AppComponent(translateService);

    verify(mockTranslateService.use('fr')).once();
    expect(localStorage.getItem('lang')).toBe('fr');
  });

  it('should use browser language and set it in localStorage if no saved language', () => {
    when(mockTranslateService.getBrowserLang()).thenReturn('de');

    component = new AppComponent(translateService);

    verify(mockTranslateService.use('de')).once();
    expect(localStorage.getItem('lang')).toBe('de');
  });

  it('should default to "en" if getBrowserLang() returns undefined', () => {
    when(mockTranslateService.getBrowserLang()).thenReturn(undefined);

    component = new AppComponent(translateService);

    verify(mockTranslateService.use('en')).once();
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('should have title "TecAllianceFrontend"', () => {
    component = new AppComponent(translateService);
    expect(component.title).toBe('TecAllianceFrontend');
  });
});
