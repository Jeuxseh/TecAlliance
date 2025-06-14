import { HeaderComponent } from './header.component';
import { TranslateService } from '@ngx-translate/core';
import { mock, instance } from 'ts-mockito';
import { AuthService } from '../../../core/services/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let mockTranslateService: TranslateService = mock(TranslateService);
  let mockAuthService: AuthService = mock(AuthService);

  let translateService = instance(mockTranslateService);
  let authService = instance(mockAuthService);
  beforeEach(async () => {
    component = new HeaderComponent(
      translateService,
      authService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
