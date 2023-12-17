import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OriginService {
  private _datas = new BehaviorSubject<any[]>([]);

  constructor(private _httpClient: HttpClient) {}

  /**
   * Getter for importations
   */
  get datas$(): Observable<any[]> {
    return this._datas.asObservable();
  }

  getData(id: any): Observable<any> {
    return this._httpClient.get<any>(environment.url + `/origins/${id}`).pipe(
      tap((response) => {
        this._datas.next(response.data);
        return response;
      })
    );
  }

  getDatas(): Observable<any> {
    return this._httpClient.get<any>(environment.url + '/origins').pipe(
      tap((response) => {
        this._datas.next(response.data);
        return response;
      })
    );
  }

  addData(data: any): Observable<any> {
    return this._httpClient.post<any>(environment.url + '/origins', data).pipe(
      tap((response) => {
        return response.message;
      })
    );
  }

  update(data: any): Observable<any> {
    return this._httpClient
      .put<any>(environment.url + '/origins/' + data.id, data)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(environment.url + '/origins/' + id).pipe(
      tap((response) => {
        return response;
      })
    );
  }
}
