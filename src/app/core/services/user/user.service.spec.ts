import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { mock, instance } from 'ts-mockito';


describe('UserService', () => {
  let service: UserService;
  let mockHttpClient: HttpClient = mock(HttpClient);
  let httpClient = instance(mockHttpClient);

  beforeEach(() => {
    service = new UserService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
