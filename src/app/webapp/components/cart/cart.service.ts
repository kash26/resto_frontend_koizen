import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSubject = new Subject<any>;
  public cartItemList : any =[]
  private _datas = new BehaviorSubject<any[]>([]);
  
  public cartTotal : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private _httpClient: HttpClient) {}

  // New Version Service
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

  // addData(data: any): Observable<any> {
  //   const headers = new HttpHeaders();
    
  //   return this._httpClient.post<any>(environment.url + '/orders', data, {headers: headers}).pipe(
  //     tap((response) => {
  //       this.productList.next([]);
  //       return response.message;
  //     })
  //   );
  // }

  // Old Version service
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any, totalPrice: any){
    this.cartItemList.push(product);
    this.cartTotal.push(totalPrice);
    this.productList.next(this.cartItemList);
    this.getTotalPrice(totalPrice);
    // console.log(this.cartItemList)
  }
  getTotalPrice(item?: any) : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      // console.log(a);
      grandTotal += a.total;
    })
    return item;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
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
