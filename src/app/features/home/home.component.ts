import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from '../../core/models/todo.model';
import { TodoService } from '../../core/services/todo/todo.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  newTodoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.newTodoForm = fb.group({
      title: ["", [Validators.required, Validators.maxLength(250)]]
    });
  }

  todoList$!: Observable<Todo[]>;

  ngOnInit() {
    this.todoList$ = this.todoService.todos$;
    this.userService.user$.subscribe((user: User | null) => {
      if(user) this.todoService.loadTodos(user.id);
    })
  }

  addTodo() {
    const title = this.newTodoForm.value.title?.trim();
    if (!title) return;

    this.todoService.addTodo(title);
    this.newTodoForm.reset();
  }

  toggle(todo: Todo) {
    this.todoService.toggleTodo(todo);
  }

  edit(todo: Todo) {
    const newDesc = prompt('Nueva descripción:', todo.title);
    if (newDesc?.trim()) {
      this.todoService.updateTodo({ ...todo, title: newDesc });
    }
  }

  confirmDelete(todo: Todo) {
    if (confirm('¿Quieres eliminar este este Todo?')) {
      this.todoService.deleteTodo(todo.id);
    }
  }


}
