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
import { EditTodoModalComponent } from '../../shared/components/edit-todo-modal/edit-todo-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


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
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  newTodoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private userService: UserService,
    private fb: FormBuilder,
    private editDialog: MatDialog,
    private confirmDeleteDialog: MatDialog,
    private translate: TranslateService
  ) {
    this.newTodoForm = fb.group({
      title: ["", Validators.maxLength(250)]
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
    todo.loading = true;
    this.todoService.toggleTodo(todo);
  }

  edit(todo: Todo) {
    this.editDialog.open(EditTodoModalComponent, {
      data: { 
        description: todo.title 
      },
      width: '500px',
    }).afterClosed().subscribe(newTitle => {
      if (newTitle) {
        todo.loading = true;
        this.todoService.updateTodo({ ...todo, title: newTitle });
      }
    });
  }

  confirmDelete(todo: Todo) {
    const message = this.translate.instant('MODALS.CONFIRM_MODAL.CONFIRM_MESSAGE');
    this.confirmDeleteDialog.open(ConfirmModalComponent, {
      data: { message: message },
      width: '500px',
    }).afterClosed().subscribe(result => {
      if (result) {
        todo.loading = true;
        this.todoService.deleteTodo(todo.id);
      }
    });
  }


}
