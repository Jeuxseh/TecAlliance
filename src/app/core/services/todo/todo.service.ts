import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  constructor(private http: HttpClient) {}

  loadTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe((todos: Todo[]) => {
      console.log(todos);
      this.todosSubject.next(todos);
    });
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: "1",
      title,
      completed: false,
      userId: 'tecAllianceUserId'
    };

    this.http.post<Todo>(this.apiUrl, newTodo).subscribe(response => {
      console.log(response);
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
    console.log(updatedTodo);
    this.updateTodo(updatedTodo);
  }

  deleteTodo(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      const current = this.todosSubject.value.filter(t => t.id !== id);
      this.todosSubject.next(current);
    });
  }
}
