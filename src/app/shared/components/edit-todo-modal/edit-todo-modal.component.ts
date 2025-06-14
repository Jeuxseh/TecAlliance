import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-todo-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule 
  ],
  templateUrl: './edit-todo-modal.component.html',
  styleUrl: './edit-todo-modal.component.css'
})
export class EditTodoModalComponent {
  description: string;

  constructor(
    public dialogRef: MatDialogRef<EditTodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string }
  ) {
    this.description = data.description;
  }

  cancel() {
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close(this.description.trim());
  }
}
