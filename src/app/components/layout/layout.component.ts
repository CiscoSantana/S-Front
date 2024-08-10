import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout(); // Chama o método de logout no AuthService
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
