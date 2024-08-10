import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) {}

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, userData);
  }

  updateUser(userData: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}`, userData);
  }
  
  getUsers(pageNumber: number, pageSize: number): Observable<{ users: User[], totalCount: number }> {
    return this.http.get<{ items: User[], totalCount: number }>(`${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(
        map(response => ({
          users: response.items,
          totalCount: response.totalCount
        }))
      );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.request<void>('delete', `${this.baseUrl}`, {
      body: id
    });
  }
}
