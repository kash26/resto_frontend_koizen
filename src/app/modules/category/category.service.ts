import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CategoryResponse {
  id?: number;
  type?: string;
  attributes?: Object;
}

export interface CategoryResponseType {
  status?: number;
}

export interface CategoryEditResponse {
  data?: CategoryResponse;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _datas = new BehaviorSubject<any[]>([]);

  constructor(private _httpClient: HttpClient) {}

  /**
   * Getter for importations
   */
  get datas$(): Observable<any[]> {
    return this._datas.asObservable();
  }

  getData(id: any): Observable<CategoryEditResponse> {
    return this._httpClient.get<CategoryEditResponse>(environment.url + `/categories/${id}`).pipe(
      tap((response: any) => {
        // console.log(response.data);
        this._datas.next(response.data);
        return response;
      })
    );
  }

  getDatas(): Observable<any> {
    return this._httpClient.get<any>(environment.url + '/categories').pipe(
      tap((response) => {
        this._datas.next(response.data);
        return response;
      })
    );
  }

  addData(data: any): Observable<any> {
    return this._httpClient.post<any>(environment.url + '/categories', data).pipe(
      tap((response) => {
        return response.message;
      })
    );
  }

  update(data: any, id: any): Observable<any> {
    return this._httpClient
      .put<any>(environment.url + '/categories/' + id, data)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(environment.url + '/categories/' + id).pipe(
      tap((response) => {
        return response;
      })
    );
  }
}
