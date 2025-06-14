import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  constructor(private http: HttpClient, private userService: UserService) {}

  loadTodos(userId: number) {
    const params = new HttpParams().set('userId', userId);
    this.http.get<Todo[]>(this.apiUrl,  { params }).subscribe((todos: Todo[]) => {
      this.todosSubject.next(todos);
    });
  }

  addTodo(title: string) {
    const currentUser = this.userService.getCurrentUser();
    const newTodo: Todo = {
      id: Math.random() * 100,
      title,
      completed: false,
      userId: currentUser ? currentUser.id : 0
    };

    this.http.post<Todo>(this.apiUrl, newTodo).subscribe(response => {
      const current = this.todosSubject.value;
      this.todosSubject.next([newTodo, ...current]);
    });
  }

  updateTodo(updatedTodo: Todo) {
    this.http.put(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo).subscribe(() => {
      const current = this.todosSubject.value.map((todo: Todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      this.todosSubject.next(current);
    });
  }

  toggleTodo(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.updateTodo(updatedTodo);
  }

  deleteTodo(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      const current = this.todosSubject.value.filter(t => t.id !== id);
      this.todosSubject.next(current);
    });
  }
}
