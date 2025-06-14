import { ConfirmModalComponent } from './confirm-delete-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { mock, instance } from 'ts-mockito';


describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;

  let mockDialogRef: MatDialogRef<ConfirmModalComponent> = mock(MatDialogRef);
  let dialogRef = instance(mockDialogRef);

  const mockData = { message: '¿Estás seguro?' };

  beforeEach(async () => {
    component = new ConfirmModalComponent(dialogRef, mockData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
