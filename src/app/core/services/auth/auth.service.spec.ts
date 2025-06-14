import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { instance, mock, reset, verify } from 'ts-mockito';

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter: Router = mock(Router);
  let router = instance(mockRouter);

  beforeEach(() => {
    service = new AuthService(router);
  });

  afterEach(() => {
    localStorage.clear();
    reset(mockRouter);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize loggedIn as false if localStorage does not have isAuthenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should initialize loggedIn as true if localStorage has isAuthenticated true', () => {
    localStorage.setItem('isAuthenticated', 'true');
    service = new AuthService(router);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('login() should set loggedIn to true and store isAuthenticated in localStorage', () => {
    service.login();
    expect(service.isAuthenticated()).toBe(true);
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
  });

  it('logout() should set loggedIn to false, clear localStorage and navigate to /login', () => {
    localStorage.setItem('userEmail', 'test@example.com');
    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
    expect(localStorage.getItem('userEmail')).toBeNull();
    verify(mockRouter.navigateByUrl('/login')).once();
  });

});
