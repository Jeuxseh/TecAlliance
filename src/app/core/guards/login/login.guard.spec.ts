import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginGuard } from './login.guard';
import { AuthService } from '../../services/auth/auth.service';
import { Injector, runInInjectionContext } from '@angular/core';

describe('LoginGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let injector: Injector;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    injector = TestBed.inject(Injector);
  });

  it('should return true if user is NOT authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    const result = runInInjectionContext(injector, () =>
      LoginGuard(null as any, null as any)
    );

    expect(result).toBeTrue();
    expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should return false and navigate to /home if user IS authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);

    const result = runInInjectionContext(injector, () =>
      LoginGuard(null as any, null as any)
    );

    expect(result).toBeFalse();
    expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  });
});
