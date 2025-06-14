import { EditTodoModalComponent } from './edit-todo-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { mock, instance, verify, deepEqual } from 'ts-mockito';

describe('EditTodoModalComponent', () => {
  let component: EditTodoModalComponent;
  let mockDialogRef: MatDialogRef<EditTodoModalComponent>;
  const mockData = { description: 'Original description' };

  beforeEach(async () => {
    mockDialogRef = mock<MatDialogRef<EditTodoModalComponent>>();
    component = new EditTodoModalComponent(instance(mockDialogRef), mockData);;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel should close dialog with null', () => {
    const originalDescription = component.description;

    component.cancel();

    verify(mockDialogRef.close(null)).once();
    expect(component.description).toBe(originalDescription);
  });

  it('save should close dialog with trimmed description', () => {
    component.description = '   Updated description   ';
    component.save();
    verify(mockDialogRef.close('Updated description')).once();
    expect(component.description.trim()).toBe('Updated description');
  });
});
