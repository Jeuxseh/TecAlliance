import { HomeComponent } from './home.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { mock, instance } from 'ts-mockito';
import { TodoService } from '../../core/services/todo/todo.service';
import { UserService } from '../../core/services/user/user.service';

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
    component = new HomeComponent(
      todoService,
      userService,
      formBuilder,
      editDialog,
      confirmDeleteDialog,
      translateService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
