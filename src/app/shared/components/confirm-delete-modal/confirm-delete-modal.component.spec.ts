import { ConfirmModalComponent } from './confirm-delete-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { mock, instance, verify } from 'ts-mockito';


describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;

  let mockDialogRef: MatDialogRef<ConfirmModalComponent> = mock(MatDialogRef);
  let dialogRef = instance(mockDialogRef);

  const mockData = { message: 'Are you sure?' };

  beforeEach(async () => {
    component = new ConfirmModalComponent(dialogRef, mockData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with false on cancel', () => {
    component.cancel();
    expect(component.data.message).toBe('Are you sure?');
    verify(mockDialogRef.close(false)).once();
  });

  it('should close dialog with true on confirm', () => {
    component.confirm();
    expect(component.data.message).toContain('Are you sure');
    verify(mockDialogRef.close(true)).once();
  });

  it('should set message from data', () => {
    expect(component.data.message).toBe('Are you sure?');
  });
});
