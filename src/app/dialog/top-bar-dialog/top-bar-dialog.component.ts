import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-top-bar-dialog',
  templateUrl: './top-bar-dialog.component.html',
  styleUrl: './top-bar-dialog.component.css', 
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class TopBarDialogComponent {
  textInput: string = '';

  constructor(public dialogRef: MatDialogRef<TopBarDialogComponent>) { }

  onSubmit(): void {
    // Close the dialog and pass the text input back to the caller
    this.dialogRef.close(this.textInput);
  }

  onCancel(): void {
    // Close the dialog without passing any input
    this.dialogRef.close();
  }

}