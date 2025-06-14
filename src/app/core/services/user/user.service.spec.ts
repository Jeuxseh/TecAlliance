import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mock, instance, anything, when } from 'ts-mockito';
import { User } from '../../models/user.model';


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
