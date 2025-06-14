import { HomeComponent } from './home.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { mock, instance, when, reset, anything, verify, deepEqual } from 'ts-mockito';
import { TodoService } from '../../core/services/todo/todo.service';
import { UserService } from '../../core/services/user/user.service';
import { of } from 'rxjs';
import { Todo } from '../../core/models/todo.model';
import { ConfirmModalComponent } from '../../shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { EditTodoModalComponent } from '../../shared/components/edit-todo-modal/edit-todo-modal.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let mockTodoService: TodoService = mock(TodoService);
  let mockUserService: UserService = mock(UserService);
  let mockFormBuilder: FormBuilder = mock(FormBuilder);
  let mockEditDialog: MatDialog = mock(MatDialog);
  let mockConfirmDeleteDialog: MatDialog = mock(MatDialog);
  let mockTranslateService: TranslateService = mock(TranslateService);

  let todoService = instance(mockTodoService);
  let userService = instance(mockUserService);
  let formBuilder = instance(mockFormBuilder);
  let editDialog = instance(mockEditDialog);
  let confirmDeleteDialog = instance(mockConfirmDeleteDialog);
  let translateService = instance(mockTranslateService);

  beforeEach(async () => {
    const realFormGroup = new FormGroup({
      title: new FormControl(''),
    });
  
    when(mockFormBuilder.group(anything())).thenReturn(realFormGroup as any);

    component = new HomeComponent(
      todoService,
      userService,
      formBuilder,
      editDialog,
      confirmDeleteDialog,
      translateService
    );
  });

  afterEach(() => {
    reset(mockTodoService);
    reset(mockUserService);
    reset(mockFormBuilder);
    reset(mockEditDialog);
    reset(mockConfirmDeleteDialog);
    reset(mockTranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should subscribe userService.user$ and loadTodos if user exists', () => {
    const user = { id: 123 } as any;
    when(mockUserService.user$).thenReturn(of(user));
    when(mockTodoService.todos$).thenReturn(of([]));

    component.ngOnInit();

    verify(mockUserService.user$).once();
    verify(mockTodoService.loadTodos(user.id)).once();
    expect(component.todoList$).toBeDefined();
  });

  it('addTodo should call addTodo and reset form when title is valid', () => {
    component.newTodoForm.controls['title'].setValue('My new todo');
    component.addTodo();
    verify(mockTodoService.addTodo('My new todo')).once();

    expect(component.newTodoForm.value.title).toBeNull();
  });

  it('addTodo should not call addTodo when title is empty or whitespace', () => {
    component.newTodoForm.controls['title'].setValue('   ');
    component.addTodo();
    verify(mockTodoService.addTodo(anything())).never();

    expect(component.newTodoForm.value.title).toBe('   ');
  });

  it('toggle should set loading true and call todoService.toggleTodo', () => {
    const todo: Todo = { id: 1, title: 'Test', loading: false } as Todo;
    component.toggle(todo);
    expect(todo.loading).toBeTrue();
    verify(mockTodoService.toggleTodo(todo)).once();
  });

  it('edit should open dialog and update todo if new title provided', () => {
    const todo: Todo = { id: 1, title: 'Test', loading: false } as Todo;
    const afterClosedMock = of('New title');
    const dialogRefMock = mock(MatDialogRef);
    when(mockEditDialog.open(EditTodoModalComponent, anything())).thenReturn(instance(dialogRefMock));
    when(dialogRefMock.afterClosed()).thenReturn(afterClosedMock);

    component.edit(todo);

    expect(todo.loading).toBeTrue();
    verify(mockTodoService.updateTodo(deepEqual({ ...todo, title: 'New title' }))).once();
  });

  it('confirmDelete should open dialog and delete todo if confirmed', () => {
    const todo: Todo = { id: 1, title: 'Test', loading: false } as Todo;
    when(mockTranslateService.instant('MODALS.CONFIRM_MODAL.CONFIRM_MESSAGE')).thenReturn('Are you sure?');

    const afterClosedMock = of(true);
    const dialogRefMock = mock(MatDialogRef);
    when(mockConfirmDeleteDialog.open(ConfirmModalComponent, anything())).thenReturn(instance(dialogRefMock));
    when(dialogRefMock.afterClosed()).thenReturn(afterClosedMock);

    component.confirmDelete(todo);

    expect(todo.loading).toBeTrue();
    verify(mockTodoService.deleteTodo(todo.id)).once();
  });

  it('confirmDelete should not delete todo if not confirmed', () => {
    const todo: Todo = { id: 1, title: 'Test', loading: false } as Todo;
    when(mockTranslateService.instant('MODALS.CONFIRM_MODAL.CONFIRM_MESSAGE')).thenReturn('Are you sure?');

    const afterClosedMock = of(false);
    const dialogRefMock = mock(MatDialogRef);
    when(mockConfirmDeleteDialog.open(ConfirmModalComponent, anything())).thenReturn(instance(dialogRefMock));
    when(dialogRefMock.afterClosed()).thenReturn(afterClosedMock);

    component.confirmDelete(todo);

    expect(todo.loading).toBeFalse();
    verify(mockTodoService.deleteTodo(todo.id)).never();
  });
  
});
