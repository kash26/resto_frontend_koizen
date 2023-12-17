import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _datas = new BehaviorSubject<any[]>([]);

  constructor(private _httpClient: HttpClient) {}

  /**
   * Getter for importations
   */
  get datas$(): Observable<any[]> {
    return this._datas.asObservable();
  }

  getData(id: any): Observable<any> {
    return this._httpClient.get<any>(environment.url + `/dishes/${id}`).pipe(
      tap((response: any) => {
        // console.log(response.data);
        this._datas.next(response.data);
        return response;
      })
    );
  }

  getDatas(): Observable<any> {
    return this._httpClient.get<any>(environment.url + '/dishes').pipe(
      tap((response) => {
        // console.log(response.data, "Service Data One");
        // const data = response.data.filter((dish: any) => dish.attributes.is_visible == 1);
        this._datas.next(response.data);
        // console.log(data, "Service Data Two");
        return response;
      })
    );
  }

  addData(data: any): Observable<any> {
    const headers = new HttpHeaders();
    
    return this._httpClient.post<any>(environment.url + '/dishes', data, {headers: headers}).pipe(
      tap((response) => {
        return response.message;
      })
    );
  }

  update(data: any): Observable<any> {
    return this._httpClient
      .put<any>(environment.url + '/dishes/' + data.id, data)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(environment.url + '/dishes/' + id).pipe(
      tap((response) => {
        return response;
      })
    );
  }
}
