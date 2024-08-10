import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/user-management']);
      },
      (error: HttpErrorResponse) => {
        const errorMessage = error.status === 401 ? 
          error.error.message || 'Nome de usuário ou senha incorretos!' : 
          'Ocorreu um erro ao tentar fazer login.';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }
}
