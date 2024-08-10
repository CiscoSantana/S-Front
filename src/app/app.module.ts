import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';       
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatIconModule } from '@angular/material/icon';           
import { MatButtonModule } from '@angular/material/button';       
import { AuthInterceptor } from './services/auth/interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';


import { LoginComponent } from './components/login/login.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddUserDialogComponent } from './components/user-management/add-user-dialog/add-user-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/user-management/confirm-delete-dialog/confirm-delete-dialog.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent,
    AddUserDialogComponent,
    ConfirmDeleteDialogComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,        
    MatPaginatorModule,    
    MatIconModule,         
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
  ],
  providers: [//Adiciona multiplos interceptadores HTTP para colocar o token em todas as requisições
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
