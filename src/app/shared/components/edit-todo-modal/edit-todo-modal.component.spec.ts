import { EditTodoModalComponent } from './edit-todo-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { mock, instance } from 'ts-mockito';

describe('EditTodoModalComponent', () => {
  let component: EditTodoModalComponent;
  let mockDialogRef: MatDialogRef<EditTodoModalComponent> = mock(MatDialogRef);

  let dialogRef = instance(mockDialogRef);

  const mockData = { description: 'Test description' };

  beforeEach(async () => {
    component = new EditTodoModalComponent(dialogRef, mockData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set description from injected data', () => {
    expect(component.description).toBe('Test description');
  });
});
