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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
