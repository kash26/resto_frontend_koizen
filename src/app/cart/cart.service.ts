import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSubject = new Subject<any>;
  public productList = new BehaviorSubject<any>([]);
  private _datas = new BehaviorSubject<any[]>([]);

  constructor(private _httpClient: HttpClient) {}

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
        this._datas.next(response.data);
        return response;
      })
    );
  }

  addData(data: any): Observable<any> {
    const headers = new HttpHeaders();
    
    return this._httpClient.post<any>(environment.url + '/orders', data, {headers: headers}).pipe(
      tap((response) => {
        this.productList.next([]);
        return response.message;
      })
    );
  }
}
