import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _datas = new BehaviorSubject<any[]>([]);
  private isAuthenticated = false;

  constructor(private _httpClient: HttpClient) {}

  /**
   * Getter for importations
   */
  get datas$(): Observable<any[]> {
    return this._datas.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(data: any): Observable<any> {
    return this._httpClient.post<any>(environment.url + '/auth/login', data).pipe(
      tap((response) => {
        this.isAuthenticated = true;
        return response.message;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
}
