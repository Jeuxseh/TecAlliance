import { mock, instance, when } from 'ts-mockito';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../core/services/user/user.service';

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
    component = new LoginComponent(
      authService,
      router,
      userService,
      translateService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
