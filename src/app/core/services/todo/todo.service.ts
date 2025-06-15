import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private todosApiUrl = environment.todosApiUrl;

  constructor(
    private http: HttpClient, 
    private userService: UserService
  ) {}

  loadTodos(userId: number) {
    const params = new HttpParams().set('userId', userId);
    this.http.get<Todo[]>(this.todosApiUrl,  { params }).subscribe((todos: Todo[]) => {
      this.todosSubject.next(todos);
    });
  }

  addTodo(title: string) {
    const currentUser = this.userService.getCurrentUser();
    
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 100),
      title,
      completed: false,
      userId: currentUser ? currentUser.id : 0
    };

    this.http.post<Todo>(this.todosApiUrl, newTodo).subscribe(response => {
      const current = this.todosSubject.value;
      this.todosSubject.next([newTodo, ...current]);
    });
  }

  updateTodo(updatedTodo: Todo) {
    this.http.put(`${this.todosApiUrl}/${updatedTodo.id}`, updatedTodo).subscribe(() => {
      const current = this.todosSubject.value.map((todo: Todo) =>
        todo.id === updatedTodo.id ? { ...updatedTodo, loading: false } : todo
      );
      this.todosSubject.next(current);
    });
  }

  toggleTodo(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.updateTodo(updatedTodo);
  }

  deleteTodo(id: number) {
    this.http.delete(`${this.todosApiUrl}/${id}`).subscribe(() => {
      const current = this.todosSubject.value.filter(t => t.id !== id);
      this.todosSubject.next(current);
    });
  }
}
