import { mock, instance, when, resetCalls, verify } from 'ts-mockito';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../core/services/user/user.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let mockAuthService: AuthService = mock(AuthService);
  let mockRouter: Router = mock(Router);
  let mockUserService: UserService = mock(UserService);
  let mockTranslateService: TranslateService = mock(TranslateService);
  let authService = instance(mockAuthService);
  let router = instance(mockRouter);
  let userService = instance(mockUserService);
  let translateService = instance(mockTranslateService);
  

  beforeEach(async () => {
    when(mockTranslateService.instant('LOGIN.NO_EMAIL_ERROR')).thenReturn('No email provided');
    when(mockTranslateService.instant('LOGIN.INVALID_EMAIL')).thenReturn('Invalid email');

    component = new LoginComponent(
      authService,
      router,
      userService,
      translateService
    );
  });

  afterEach(() => {
    resetCalls(mockAuthService);
    resetCalls(mockRouter);
    resetCalls(mockUserService);
    resetCalls(mockTranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error if email is empty', () => {
    component.email = '';
    component.login();
    expect(component.error).toBe('No email provided');
    verify(mockTranslateService.instant('LOGIN.NO_EMAIL_ERROR')).once();
  });

  it('should set error if validateEmail returns false', () => {
    component.email = 'test@example.com';
    when(mockUserService.validateEmail('test@example.com')).thenReturn(of(false));

    component.login();

    expect(component.error).toBe('Invalid email');
    verify(mockUserService.validateEmail('test@example.com')).once();
    verify(mockTranslateService.instant('LOGIN.INVALID_EMAIL')).once();
  });

  it('should call login and navigate if validateEmail returns true', () => {
    component.email = 'test@example.com';
    when(mockUserService.validateEmail('test@example.com')).thenReturn(of(true));

    component.login();

    expect(component.error).toBe('');
    verify(mockUserService.validateEmail('test@example.com')).once();
    verify(mockAuthService.login()).once();
    verify(mockRouter.navigateByUrl('/home')).once();
  });
});
