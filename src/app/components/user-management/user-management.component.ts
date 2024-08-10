import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'operations'];
  dataSource = new MatTableDataSource<User>([]);
  totalUsers = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;

  private baseUrl = `${environment.apiUrl}/User`;

  constructor(private userService: UserService, private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers(0, this.pageSize);
    this.dataSource.paginator = this.paginator;
  }

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, userData);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { user: null, mode: 'add' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se o resultado for válido (usuário foi adicionado), recarregue a lista de usuários
        this.loadUsers(this.pageIndex, this.pageSize);
      }
    });
  }

  loadUsers(pageIndex: number, pageSize: number): void {
    this.userService.getUsers(pageIndex + 1, pageSize).subscribe(response => {
      console.log('Usuários:', response.users);
      console.log('Total de Usuários:', response.totalCount);
      console.log('PageIndex:', pageIndex, 'PageSize:', pageSize);
      
      this.dataSource.data = response.users;
      this.totalUsers = response.totalCount;
      this.dataSource.paginator = this.paginator;
      console.log("paginator: ", this.dataSource.paginator)
    });
  }

pageEvent(event: any): void {
  console.log('Page Event:', event);
  console.log('PageIndex:', event.pageIndex, 'PageSize:', event.pageSize);
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadUsers(this.pageIndex, this.pageSize); // Carrega os dados para a nova página
}

  viewUser(user: User): void {
    this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { user, mode: 'view' }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',     
      data: { user, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(this.pageIndex, this.pageSize);  // Recarrega a lista de usuários
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.loadUsers(this.pageIndex, this.pageSize); // Recarrega a lista de usuários após a exclusão
        });
      }
    });
  }
}
