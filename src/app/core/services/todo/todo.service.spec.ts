import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { mock, instance } from 'ts-mockito';
import { UserService } from '../user/user.service';

describe('TodoService', () => {
  let service: TodoService;
  let mockHttpClient: HttpClient = mock(HttpClient);
  let mockUserService: UserService = mock(UserService);

  let httpClient = instance(mockHttpClient);
  let userService = instance(mockUserService);

  beforeEach(() => {
    service = new TodoService(httpClient, userService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
