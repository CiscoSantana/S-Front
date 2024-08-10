import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  addUserForm: FormGroup;
  isEditMode = false;
  isViewMode = false;
  hide = true; 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, mode: 'view' | 'edit' | 'add' }
  ) {
    this.isEditMode = this.data?.mode === 'edit';
    this.isViewMode = this.data?.mode === 'view';

    this.addUserForm = this.fb.group({
      id: [this.data?.user?.id || 0],
      login: [this.data?.user?.login || '', [Validators.required]],
      passwd: [this.isEditMode ? '' : '', this.isEditMode ? [] : [Validators.required]], // Senha não obrigatória em modo de edição
      email: [this.data?.user?.email || '', [Validators.required, Validators.email]],
      isEnabled: [this.data?.user?.isEnabled || true]  
    });

    if (this.data.mode === 'edit') {
      this.isEditMode = true;
      this.isViewMode = false;
      this.addUserForm.patchValue(this.data.user);
    } else if (this.data.mode === 'view') {
      this.isViewMode = true;
      this.addUserForm.patchValue(this.data.user);
      this.addUserForm.disable();
    }
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addUserForm.valid) {
      const userData = this.addUserForm.value;
  
      if (this.isEditMode) {
        this.userService.updateUser(userData).subscribe({
          next: (response) => {
            this.dialogRef.close(true); 
          },
          error: (error) => {
            if (error.status === 409 && error.error?.message) {
              // Exibe o tooltip/snackbar se o erro for 409 e a mensagem for de usuário existente
              this.snackBar.open(error.error.message, 'Fechar', {
                duration: 3000, 
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        });
      } else {
        this.userService.addUser(userData).subscribe({
          next: (response) => {
            this.dialogRef.close(true); // Fecha o diálogo em caso de sucesso
          },
          error: (error) => {
            if (error.status === 409 && error.error?.message) {
              // Exibe o tooltip/snackbar se o erro for 409 e a mensagem for de usuário existente
              this.snackBar.open(error.error.message, 'Fechar', {
                duration: 3000, 
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        });
      }
    }
  }
  
}
