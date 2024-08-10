import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent, // O LayoutComponent envolve as rotas autenticadas
    canActivate: [AuthGuard], // Garante que o usuário esteja autenticado
    children: [
      { path: 'user-management', component: UserManagementComponent },      
    ]
  },
  { path: '**', redirectTo: 'login' } // Redireciona para o login se a rota não for encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
