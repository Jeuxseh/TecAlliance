import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { mock, instance, anything, capture, verify, when } from 'ts-mockito';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';
import { Todo } from '../../models/todo.model';

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

  it('loadTodos should call http.get with userId param and update todosSubject', done => {
    const fakeTodos: Todo[] = [{ id: 1, title: 'Test', completed: false, userId: 1 }];
    when(mockHttpClient.get<Todo[]>(anything(), anything())).thenReturn(of(fakeTodos as any));

    service.loadTodos(1);

    service.todos$.subscribe(todos => {
      expect(todos).toEqual(fakeTodos);
      done();
    });

    verify(mockHttpClient.get<Todo[]>(service['apiUrl'], anything())).once();
    const [url] = capture(mockHttpClient.get).last();
    expect(url).toBe(service['apiUrl']);
  });

  it('addTodo should post new todo and update todosSubject', done => {
    const fakeUser = { id: 5 };
    when(mockUserService.getCurrentUser()).thenReturn(fakeUser as any);
    when(mockHttpClient.post<Todo>(anything(), anything())).thenReturn(of({} as any));

    service["todosSubject"].next([]);

    service.addTodo('New Todo');

    service.todos$.subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('New Todo');
      expect(todos[0].userId).toBe(fakeUser.id);
      expect(todos[0].completed).toBe(false);
      done();
    });

    verify(mockHttpClient.post(service['apiUrl'], anything())).once();
  });

  it('updateTodo should call http.put and update todosSubject', done => {
    const existingTodo: Todo = { id: 1, title: 'Old', completed: false, userId: 1 };
    service["todosSubject"].next([existingTodo]);
    when(mockHttpClient.put(anything(), anything())).thenReturn(of({}));

    const updatedTodo: Todo = { ...existingTodo, title: 'Updated', loading: true };

    service.updateTodo(updatedTodo);

    service.todos$.subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('Updated');
      expect(todos[0].loading).toBe(false);
      done();
    });

    verify(mockHttpClient.put(`${service['apiUrl']}/${updatedTodo.id}`, updatedTodo)).once();
  });

  it('deleteTodo should call http.delete and update todosSubject', done => {
    const todo1: Todo = { id: 1, title: 'One', completed: false, userId: 1 };
    const todo2: Todo = { id: 2, title: 'Two', completed: false, userId: 1 };
    service["todosSubject"].next([todo1, todo2]);

    when(mockHttpClient.delete(anything())).thenReturn(of({}));

    service.deleteTodo(1);

    service.todos$.subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0].id).toBe(2);
      done();
    });

    verify(mockHttpClient.delete(`${service['apiUrl']}/1`)).once();
  });
});
