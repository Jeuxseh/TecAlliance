import { HeaderComponent } from './header.component';
import { TranslateService } from '@ngx-translate/core';
import { mock, instance, anything, when, reset, verify } from 'ts-mockito';
import { AuthService } from '../../../core/services/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let mockTranslateService: TranslateService = mock(TranslateService);
  let mockAuthService: AuthService = mock(AuthService);

  let translateService = instance(mockTranslateService);
  let authService = instance(mockAuthService);

  beforeEach(async () => {
    when(mockTranslateService.getBrowserLang()).thenReturn('en');
    when(mockTranslateService.use(anything())).thenReturn(Promise.resolve() as any);

    component = new HeaderComponent(
      translateService,
      authService
    );
  });

  afterEach(() => {
    localStorage.clear();
    reset(mockTranslateService);
    reset(mockAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedLang based on localStorage lang if present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fr');

    component = new HeaderComponent(translateService, authService);

    expect(component.selectedLang.code.toLowerCase()).toBe('fr');
    verify(mockTranslateService.use('fr')).once();
  });

  it('should set selectedLang based on browser lang if localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    when(mockTranslateService.getBrowserLang()).thenReturn('de');

    component = new HeaderComponent(translateService, authService);

    expect(component.selectedLang.code.toLowerCase()).toBe('de');
    verify(mockTranslateService.use('de')).once();
  });

  it('should fallback to default language if lang not found', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    when(mockTranslateService.getBrowserLang()).thenReturn('it');

    component = new HeaderComponent(translateService, authService);

    expect(component.selectedLang.code.toLowerCase()).toBe('en');
  });

  it('changeLanguage() should update selectedLang and call translate.use', (done) => {
    when(mockTranslateService.use('es')).thenReturn(Promise.resolve() as any);

    component.changeLanguage('es');

    spyOn(localStorage, 'setItem');
    component.changeLanguage('es');
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'es');

    setTimeout(() => {
      expect(component.dropdownOpen).toBeFalse();
      done();
    }, 20);
  });

  it('should fallback to defaultLanguage when localStorage and browserLang are falsy', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    when(mockTranslateService.getBrowserLang()).thenReturn(null as any);
  
    component = new HeaderComponent(translateService, authService);
  
    expect(component.selectedLang.code.toLowerCase()).toBe('en'); 
  });

  it('toggleDropdown() should toggle dropdownOpen', () => {
    component.dropdownOpen = false;
    component.toggleDropdown();
    expect(component.dropdownOpen).toBeTrue();

    component.toggleDropdown();
    expect(component.dropdownOpen).toBeFalse();
  });

  it('logOut() should call authService.logout()', () => {
    component.logOut();
    verify(mockAuthService.logout()).once();
    expect(component).toBeTruthy();
  });
});
